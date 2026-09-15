import { useEffect } from 'react'
import clickUrl from '../../asset/soundeffect/click.wav'

const CLICK_VOLUME = 0.4

let audioContext: AudioContext | null = null
let clickBuffer: AudioBuffer | null = null
let loadPromise: Promise<void> | null = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

function playBuffered() {
  if (!clickBuffer) return

  const context = getAudioContext()
  const source = context.createBufferSource()
  const gain = context.createGain()
  source.buffer = clickBuffer
  gain.gain.value = CLICK_VOLUME
  source.connect(gain)
  gain.connect(context.destination)
  source.start(0)
}

/** Fetches and decodes click.wav so clicks can play without network delay. */
export function preloadClickSound() {
  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        const response = await fetch(clickUrl)
        const data = await response.arrayBuffer()
        const context = getAudioContext()
        clickBuffer = await context.decodeAudioData(data.slice(0))
      } catch {
        clickBuffer = null
      }
    })()
  }
  return loadPromise
}

/** Plays the UI click sound. Safe to call from user gestures. */
export function playClickSound() {
  const context = getAudioContext()

  if (context.state === 'suspended') {
    void context.resume().then(() => {
      if (clickBuffer) playBuffered()
      else void preloadClickSound().then(playBuffered)
    })
    return
  }

  if (clickBuffer) {
    playBuffered()
    return
  }

  void preloadClickSound().then(playBuffered)
}

/** Plays click.wav on primary pointer presses anywhere in the document. */
export function useGlobalClickSound() {
  useEffect(() => {
    void preloadClickSound()

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      playClickSound()
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])
}
