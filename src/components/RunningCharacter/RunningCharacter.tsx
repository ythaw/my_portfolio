import { useEffect, useState, type CSSProperties } from 'react'
import run1Img from '../../../asset/run/run1.PNG'
import run2Img from '../../../asset/run/run2.PNG'
import run3Img from '../../../asset/run/run3.PNG'
import { WaitForLayers } from '../WaitForLayers'
import './RunningCharacter.css'

/** Run animation frame sources. */
const RUN_FRAMES = [run1Img, run2Img, run3Img] as const
/** Frame order for one run loop. */
const RUN_CYCLE = [0, 1, 2, 1] as const

export type RunningCharacterProps = {
  width?: number | string
  className?: string
  style?: CSSProperties
  /** Advances the run cycle when true. */
  playing?: boolean
  /** Milliseconds each frame is held. */
  frameMs?: number
}

/**
 * Running character sprite cycle.
 */
export function RunningCharacter({
  width = 160,
  className = '',
  style,
  playing = true,
  frameMs = 320,
}: RunningCharacterProps) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (!playing) return

    const id = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % RUN_CYCLE.length)
    }, frameMs)

    return () => window.clearInterval(id)
  }, [playing, frameMs])

  const rootClass = ['running-character', className].filter(Boolean).join(' ')
  const activeFrame = RUN_CYCLE[frameIndex]

  return (
    <WaitForLayers
      layerCount={RUN_FRAMES.length}
      className={rootClass}
      style={{ width, ...style }}
    >
      {({ bindLayer }) => (
        <div role="img" aria-label="Character running" data-frame={activeFrame + 1}>
          {RUN_FRAMES.map((src, index) => {
            const bind = bindLayer(src)
            return (
              <img
                key={src}
                className="running-character__frame"
                src={src}
                alt=""
                draggable={false}
                hidden={index !== activeFrame}
                ref={bind.ref}
                onLoad={bind.onLoad}
              />
            )
          })}
        </div>
      )}
    </WaitForLayers>
  )
}

export default RunningCharacter
