import { useEffect, useRef, useState, type CSSProperties } from 'react'
import bodyImg from '../../../asset/idle/body.PNG'
import hairImg from '../../../asset/idle/hair.PNG'
import excitedImg from '../../../asset/idle/excited.PNG'
import eyesImg from '../../../asset/idle/eyes.PNG'
import blinkImg from '../../../asset/idle/blink.PNG'
import leftPupilImg from '../../../asset/idle/left pupil.PNG'
import rightPupilImg from '../../../asset/idle/right pupil.PNG'
import glassesImg from '../../../asset/idle/glasses.PNG'
import { WaitForLayers } from '../WaitForLayers'
import './IdleCharacter.css'

export type PupilLookOffset = {
  /** Horizontal pupil shift as a percent of the character width. */
  x: number
  /** Vertical pupil shift as a percent of the character height. */
  y: number
}

export type IdleExpression = 'idle' | 'excited'

export type IdleCharacterProps = {
  /** Character width; height follows the asset aspect ratio. */
  width?: number | string
  className?: string
  style?: CSSProperties
  /** Enables the blink cycle when true. */
  enableBlink?: boolean
  /** Pupil look offset. */
  lookOffset?: PupilLookOffset
  /** Face expression overlay. */
  expression?: IdleExpression
}

const BLINK_MIN_MS = 120
const BLINK_MAX_MS = 180
const IDLE_MIN_MS = 3000
const IDLE_MAX_MS = 7000
const DOUBLE_BLINK_CHANCE = 0.28
const DOUBLE_BLINK_GAP_MS = 90

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

const IDLE_LAYER_COUNT = 8

/**
 * Layered idle character with blink and look offset.
 */
export function IdleCharacter({
  width = 320,
  className = '',
  style,
  enableBlink = true,
  lookOffset = { x: 0, y: 0 },
  expression = 'idle',
}: IdleCharacterProps) {
  const [isBlinking, setIsBlinking] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const timersRef = useRef<number[]>([])
  const cancelledRef = useRef(false)
  const isExcited = expression === 'excited'
  const canBlink = enableBlink && !isExcited

  useEffect(() => {
    cancelledRef.current = false
    timersRef.current = []

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
    }

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        timersRef.current = timersRef.current.filter((t) => t !== id)
        if (!cancelledRef.current) fn()
      }, delay)
      timersRef.current.push(id)
    }

    if (!canBlink || prefersReducedMotion) {
      setIsBlinking(false)
      return clearTimers
    }

    const runBlinkCycle = () => {
      const blinkDuration = randomBetween(BLINK_MIN_MS, BLINK_MAX_MS)
      const doDouble = Math.random() < DOUBLE_BLINK_CHANCE

      setIsBlinking(true)

      schedule(() => {
        setIsBlinking(false)

        if (doDouble) {
          schedule(() => {
            const secondDuration = randomBetween(BLINK_MIN_MS, BLINK_MAX_MS)
            setIsBlinking(true)
            schedule(() => {
              setIsBlinking(false)
              scheduleNextIdle()
            }, secondDuration)
          }, DOUBLE_BLINK_GAP_MS)
        } else {
          scheduleNextIdle()
        }
      }, blinkDuration)
    }

    const scheduleNextIdle = () => {
      schedule(runBlinkCycle, randomBetween(IDLE_MIN_MS, IDLE_MAX_MS))
    }

    scheduleNextIdle()

    return () => {
      cancelledRef.current = true
      clearTimers()
    }
  }, [canBlink, prefersReducedMotion])

  const rootClass = ['idle-character', className].filter(Boolean).join(' ')
  const pupilStyle: CSSProperties = {
    transform: `translate(${lookOffset.x}%, ${lookOffset.y}%)`,
  }

  return (
    <WaitForLayers
      layerCount={IDLE_LAYER_COUNT}
      className={rootClass}
      style={{ width, ...style }}
    >
      {({ bindLayer }) => {
        const body = bindLayer(bodyImg)
        const hair = bindLayer(hairImg)
        const excited = bindLayer(excitedImg)
        const eyes = bindLayer(eyesImg)
        const blink = bindLayer(blinkImg)
        const leftPupil = bindLayer(leftPupilImg)
        const rightPupil = bindLayer(rightPupilImg)
        const glasses = bindLayer(glassesImg)

        return (
          <div
            role="img"
            aria-label="Idle character"
            data-blinking={isBlinking ? 'true' : 'false'}
            data-expression={expression}
          >
            {/* Draw order: body, hair, expression, eyes, pupils, glasses. */}
            <img className="idle-character__layer idle-character__body" src={bodyImg} alt="" draggable={false} ref={body.ref} onLoad={body.onLoad} />
            <img className="idle-character__layer idle-character__hair" src={hairImg} alt="" draggable={false} ref={hair.ref} onLoad={hair.onLoad} />

            <img
              className="idle-character__layer idle-character__excited"
              src={excitedImg}
              alt=""
              draggable={false}
              hidden={!isExcited}
              ref={excited.ref}
              onLoad={excited.onLoad}
            />

            <img
              className="idle-character__layer idle-character__eyes"
              src={eyesImg}
              alt=""
              draggable={false}
              hidden={isBlinking}
              ref={eyes.ref}
              onLoad={eyes.onLoad}
            />
            <img
              className="idle-character__layer idle-character__blink"
              src={blinkImg}
              alt=""
              draggable={false}
              hidden={!isBlinking}
              ref={blink.ref}
              onLoad={blink.onLoad}
            />

            <img
              className="idle-character__layer idle-character__pupil idle-character__pupil--left"
              src={leftPupilImg}
              alt=""
              draggable={false}
              hidden={isBlinking}
              style={pupilStyle}
              ref={leftPupil.ref}
              onLoad={leftPupil.onLoad}
            />
            <img
              className="idle-character__layer idle-character__pupil idle-character__pupil--right"
              src={rightPupilImg}
              alt=""
              draggable={false}
              hidden={isBlinking}
              style={pupilStyle}
              ref={rightPupil.ref}
              onLoad={rightPupil.onLoad}
            />

            <img className="idle-character__layer idle-character__glasses" src={glassesImg} alt="" draggable={false} ref={glasses.ref} onLoad={glasses.onLoad} />
          </div>
        )
      }}
    </WaitForLayers>
  )
}

export default IdleCharacter
