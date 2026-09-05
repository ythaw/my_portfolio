import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import legsImg from '../../../asset/sitting/legs.PNG'
import bodyImg from '../../../asset/sitting/body.PNG'
import faceImg from '../../../asset/sitting/face.PNG'
import mouthImg from '../../../asset/sitting/mouth.PNG'
import eyesImg from '../../../asset/sitting/eyes.PNG'
import pupilsImg from '../../../asset/sitting/pupils.PNG'
import hairImg from '../../../asset/sitting/hair.PNG'
import glassesImg from '../../../asset/sitting/IMG_0210.PNG'
import laughImg from '../../../asset/sitting/laugh.PNG'
import { WaitForLayers } from '../WaitForLayers'
import './SittingCharacter.css'

export type SittingCharacterProps = {
  width?: number | string
  className?: string
  style?: CSSProperties
  /** Shows the laugh overlay. */
  laughing?: boolean
  /** Moves pupils toward the pointer. */
  followMouse?: boolean
  /** Toggles the laugh overlay on click. */
  laughOnClick?: boolean
}

const SIT_LAYERS = [
  { src: legsImg, className: 'sitting-character__legs' },
  { src: bodyImg, className: 'sitting-character__body' },
  { src: faceImg, className: 'sitting-character__face' },
  { src: mouthImg, className: 'sitting-character__mouth' },
  { src: eyesImg, className: 'sitting-character__eyes' },
  { src: pupilsImg, className: 'sitting-character__pupils' },
  { src: hairImg, className: 'sitting-character__hair' },
  { src: glassesImg, className: 'sitting-character__glasses' },
  { src: laughImg, className: 'sitting-character__laugh' },
] as const

const LAUGH_MS = 1200

/** Max pupil travel as a percent of the character frame. */
const LOOK_MAX_X = 0.8
const LOOK_MAX_Y = 0.5
/** Pointer distance in px that maps to full look strength. */
const LOOK_RANGE_PX = 260
/** Eye center within the sitting canvas (normalized). */
const EYE_CENTER = { x: 0.5, y: 0.2 }

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function usePupilMouseLook(
  enabled: boolean,
  rootRef: RefObject<HTMLElement | null>,
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      setOffset({ x: 0, y: 0 })
      return
    }

    const onMove = (event: PointerEvent) => {
      const root = rootRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      const eyeX = rect.left + rect.width * EYE_CENTER.x
      const eyeY = rect.top + rect.height * EYE_CENTER.y
      const dx = event.clientX - eyeX
      const dy = event.clientY - eyeY
      const dist = Math.hypot(dx, dy)
      if (dist < 0.001) {
        setOffset({ x: 0, y: 0 })
        return
      }

      const strength = Math.min(1, dist / LOOK_RANGE_PX)
      setOffset({
        x: (dx / dist) * LOOK_MAX_X * strength,
        y: (dy / dist) * LOOK_MAX_Y * strength,
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, rootRef])

  return offset
}

/**
 * Layered sitting character with mouse look and optional laugh overlay.
 */
export function SittingCharacter({
  width = 140,
  className = '',
  style,
  laughing = false,
  followMouse = true,
  laughOnClick = true,
}: SittingCharacterProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const laughTimerRef = useRef<number | null>(null)
  const [clickLaughing, setClickLaughing] = useState(false)
  const look = usePupilMouseLook(followMouse, rootRef)
  const showLaugh = laughing || clickLaughing
  const interactive = laughOnClick

  useEffect(() => () => {
    if (laughTimerRef.current != null) window.clearTimeout(laughTimerRef.current)
  }, [])

  const triggerLaugh = () => {
    if (!laughOnClick) return
    setClickLaughing(true)
    if (laughTimerRef.current != null) window.clearTimeout(laughTimerRef.current)
    laughTimerRef.current = window.setTimeout(() => {
      setClickLaughing(false)
      laughTimerRef.current = null
    }, LAUGH_MS)
  }

  const rootClass = [
    'sitting-character',
    interactive && 'sitting-character--interactive',
    showLaugh && 'sitting-character--laughing',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const pupilStyle: CSSProperties = {
    transform: `translate(${look.x}%, ${look.y}%)`,
  }

  return (
    <WaitForLayers
      layerCount={SIT_LAYERS.length}
      className={rootClass}
      style={{ width, ...style }}
      rootRef={rootRef}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? 'Sitting character, click to laugh' : undefined}
      onClick={interactive ? triggerLaugh : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                triggerLaugh()
              }
            }
          : undefined
      }
    >
      {({ bindLayer }) => (
        <>
          {SIT_LAYERS.map((layer) => {
            const bind = bindLayer(layer.src)
            const isLaugh = layer.className === 'sitting-character__laugh'
            const isPupils = layer.className === 'sitting-character__pupils'
            return (
              <img
                key={layer.className}
                className={`sitting-character__layer ${layer.className}`}
                src={layer.src}
                alt=""
                draggable={false}
                hidden={isLaugh && !showLaugh}
                style={isPupils ? pupilStyle : undefined}
                ref={bind.ref}
                onLoad={bind.onLoad}
              />
            )
          })}
        </>
      )}
    </WaitForLayers>
  )
}

export default SittingCharacter
