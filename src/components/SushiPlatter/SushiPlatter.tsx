import { useEffect, useRef, useState, type CSSProperties } from 'react'
import platterImg from '../../../asset/sushi/sushi_platter.PNG'
import popImg from '../../../asset/sushi/pop.PNG'
import './SushiPlatter.css'

export type SushiPlatterProps = {
  /** Shows the platter. */
  visible?: boolean
  /** Plays the pop overlay once. */
  playPop?: boolean
  /** Disables the enter animation. */
  suppressEnter?: boolean
  width?: number | string
  className?: string
  style?: CSSProperties
  onPopEnd?: () => void
}

const POP_DELAY_MS = 180
const POP_MS = 1100

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

/**
 * Sushi platter with optional pop overlay.
 */
export function SushiPlatter({
  visible = false,
  playPop = false,
  suppressEnter = false,
  width = '100%',
  className = '',
  style,
  onPopEnd,
}: SushiPlatterProps) {
  const [showPop, setShowPop] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const onPopEndRef = useRef(onPopEnd)
  onPopEndRef.current = onPopEnd

  useEffect(() => {
    if (!visible || !playPop) {
      setShowPop(false)
      return
    }

    if (prefersReducedMotion) {
      setShowPop(false)
      onPopEndRef.current?.()
      return
    }

    const startId = window.setTimeout(() => setShowPop(true), POP_DELAY_MS)
    const endId = window.setTimeout(() => {
      setShowPop(false)
      onPopEndRef.current?.()
    }, POP_DELAY_MS + POP_MS)

    return () => {
      window.clearTimeout(startId)
      window.clearTimeout(endId)
    }
  }, [visible, playPop, prefersReducedMotion])

  if (!visible) return null

  const rootClass = [
    'sushi-platter',
    showPop && 'sushi-platter--popping',
    suppressEnter && 'sushi-platter--no-enter',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={rootClass}
      style={{ width, ...style }}
      role="img"
      aria-label="Sushi platter"
      data-popping={showPop ? 'true' : 'false'}
    >
      <img
        className="sushi-platter__layer sushi-platter__board"
        src={platterImg}
        alt=""
        draggable={false}
      />
      <img
        className={[
          'sushi-platter__layer',
          'sushi-platter__pop',
          showPop && 'sushi-platter__pop--visible',
        ]
          .filter(Boolean)
          .join(' ')}
        src={popImg}
        alt=""
        draggable={false}
      />
    </div>
  )
}

export default SushiPlatter
