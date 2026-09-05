import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IdleCharacter } from './components/IdleCharacter'
import { PortfolioSections } from './components/PortfolioSections'
import { RunningCharacter } from './components/RunningCharacter'
import { SittingCharacter } from './components/SittingCharacter'
import { SushiPlatter } from './components/SushiPlatter'
import './App.css'

type IntroPhase = 'idle' | 'sushi-pop' | 'sushi-look' | 'sushi-travel' | 'sushi-arrived'

const LOOK_HOLD_MS = 2000
const LOOK_DELAY_MS = 1000
const TRAVEL_MS = 4500
const SUSHI_LOOK = { x: -0.55, y: -1.15 }

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function buildDiagonalKeyframes(
  startLeft: number,
  startTop: number,
  endLeft: number,
  endTop: number,
  startWidth?: number,
  endWidth?: number,
) {
  const from: Keyframe = {
    left: `${startLeft}px`,
    top: `${startTop}px`,
    transform: 'rotate(0deg)',
  }
  const to: Keyframe = {
    left: `${endLeft}px`,
    top: `${endTop}px`,
    transform: 'rotate(0deg)',
  }
  if (startWidth != null && endWidth != null) {
    from.width = `${startWidth}px`
    to.width = `${endWidth}px`
  }
  return [from, to]
}

export default function App() {
  const [phase, setPhase] = useState<IntroPhase>('idle')
  const [looking, setLooking] = useState(false)
  /** True once the runner is positioned on the idle character’s box. */
  const [runnerLockedIn, setRunnerLockedIn] = useState(false)
  /** True after the idle character unmounts for the chase. */
  const [idleDismissed, setIdleDismissed] = useState(false)
  const sushiAnchorRef = useRef<HTMLDivElement>(null)
  const characterAnchorRef = useRef<HTMLDivElement>(null)
  const idleCharacterRef = useRef<HTMLDivElement>(null)
  const sitTargetRef = useRef<HTMLDivElement>(null)
  const sushiTargetRef = useRef<HTMLDivElement>(null)
  const travelAnimRef = useRef<Animation | null>(null)
  const chaseAnimRef = useRef<Animation | null>(null)
  const pendingArrivalsRef = useRef({ sushi: false, character: false })
  const chaseStartRef = useRef<{ left: number; top: number; width: number } | null>(null)

  const sushiVisible = phase !== 'idle'
  const playPop = phase === 'sushi-pop'
  const isChasing = phase === 'sushi-travel'
  const hasArrived = phase === 'sushi-arrived'
  const showCornerIdle =
    phase === 'idle'
    || phase === 'sushi-pop'
    || phase === 'sushi-look'
    || (phase === 'sushi-travel' && !idleDismissed)
  const showRunner = isChasing && runnerLockedIn

  const tryFinishTravel = () => {
    const pending = pendingArrivalsRef.current
    if (pending.sushi && pending.character) {
      setPhase('sushi-arrived')
    }
  }

  useEffect(() => {
    if (phase === 'idle') {
      setLooking(false)
      setRunnerLockedIn(false)
      setIdleDismissed(false)
      chaseStartRef.current = null
      return
    }

    if (phase === 'sushi-pop' || phase === 'sushi-look') {
      setRunnerLockedIn(false)
      setIdleDismissed(false)
      chaseStartRef.current = null
    }

    if (phase !== 'sushi-pop') return

    const id = window.setTimeout(() => setLooking(true), LOOK_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'sushi-look') return

    const id = window.setTimeout(() => {
      setPhase(prefersReducedMotion() ? 'sushi-arrived' : 'sushi-travel')
    }, LOOK_HOLD_MS)

    return () => window.clearTimeout(id)
  }, [phase])

  // Record chase start positions and mount the runner.
  useLayoutEffect(() => {
    if (phase !== 'sushi-travel') return

    const idleEl = idleCharacterRef.current
    const sushiEl = sushiAnchorRef.current
    if (!idleEl || !sushiEl || runnerLockedIn) return

    const idleRect = idleEl.getBoundingClientRect()
    chaseStartRef.current = {
      left: idleRect.left,
      top: idleRect.top,
      width: idleRect.width,
    }

    const sushiStart = sushiEl.getBoundingClientRect()
    sushiEl.style.left = `${sushiStart.left}px`
    sushiEl.style.top = `${sushiStart.top}px`
    sushiEl.style.right = 'auto'
    sushiEl.style.bottom = 'auto'

    setRunnerLockedIn(true)
  }, [phase, runnerLockedIn])

  // Animate sushi and runner from start positions to the nav perch.
  useLayoutEffect(() => {
    if (phase !== 'sushi-travel' || !runnerLockedIn) return

    const sushiEl = sushiAnchorRef.current
    const charEl = characterAnchorRef.current
    const sitTarget = sitTargetRef.current
    const sushiTarget = sushiTargetRef.current
    const start = chaseStartRef.current
    if (!sushiEl || !charEl || !sitTarget || !sushiTarget || !start) return

    pendingArrivalsRef.current = { sushi: false, character: false }

    const sitEnd = sitTarget.getBoundingClientRect()
    const sushiEnd = sushiTarget.getBoundingClientRect()

    charEl.style.left = `${start.left}px`
    charEl.style.top = `${start.top}px`
    charEl.style.right = 'auto'
    charEl.style.bottom = 'auto'
    charEl.style.width = `${start.width}px`

    // Hide the idle character after the runner is in place.
    const dismissId = window.requestAnimationFrame(() => setIdleDismissed(true))

    if (prefersReducedMotion()) {
      sushiEl.style.left = `${sushiEnd.left}px`
      sushiEl.style.top = `${sushiEnd.top}px`
      sushiEl.style.transform = 'none'
      setPhase('sushi-arrived')
      return () => window.cancelAnimationFrame(dismissId)
    }

    const sushiLeft = Number.parseFloat(sushiEl.style.left) || sushiEl.getBoundingClientRect().left
    const sushiTop = Number.parseFloat(sushiEl.style.top) || sushiEl.getBoundingClientRect().top

    const sushiKeyframes = buildDiagonalKeyframes(
      sushiLeft,
      sushiTop,
      sushiEnd.left,
      sushiEnd.top,
    )
    const sushiAnimation = sushiEl.animate(sushiKeyframes, {
      duration: TRAVEL_MS,
      easing: 'linear',
      fill: 'forwards',
    })
    travelAnimRef.current = sushiAnimation

    const chaseKeyframes = buildDiagonalKeyframes(
      start.left,
      start.top,
      sitEnd.left,
      sitEnd.top,
      start.width,
      sitEnd.width,
    )
    const chaseAnimation = charEl.animate(chaseKeyframes, {
      duration: TRAVEL_MS,
      easing: 'linear',
      fill: 'forwards',
    })
    chaseAnimRef.current = chaseAnimation
    chaseAnimation.onfinish = () => {
      charEl.style.left = `${sitEnd.left}px`
      charEl.style.top = `${sitEnd.top}px`
      charEl.style.width = `${sitEnd.width}px`
      charEl.style.transform = 'none'
      pendingArrivalsRef.current.character = true
      tryFinishTravel()
    }

    sushiAnimation.onfinish = () => {
      sushiEl.style.left = `${sushiEnd.left}px`
      sushiEl.style.top = `${sushiEnd.top}px`
      sushiEl.style.transform = 'none'
      pendingArrivalsRef.current.sushi = true
      tryFinishTravel()
    }

    return () => {
      window.cancelAnimationFrame(dismissId)
      sushiAnimation.cancel()
      chaseAnimRef.current?.cancel()
      travelAnimRef.current = null
      chaseAnimRef.current = null
    }
  }, [phase, runnerLockedIn])

  return (
    <main className={['app', hasArrived && 'app--revealed'].filter(Boolean).join(' ')}>
      {/* Preload run / sit / sushi assets offscreen. */}
      <div className="app__asset-cache" aria-hidden="true">
        <RunningCharacter width={120} playing={false} />
        <SittingCharacter width={120} followMouse={false} laughOnClick={false} />
        <SushiPlatter visible suppressEnter width={80} />
      </div>

      {/* Hidden nav used to measure chase end targets. */}
      <header className="app__nav app__nav--ghost" aria-hidden="true">
        <div className="app__nav-perch">
          <div ref={sushiTargetRef} className="app__nav-sushi" />
          <div ref={sitTargetRef} className="app__nav-sitter" />
        </div>
      </header>

      {hasArrived && (
        <>
          <header className="app__nav">
            <div className="app__nav-brand">portfolio</div>
            <nav className="app__nav-links" aria-label="Primary">
              <a href="#about">about</a>
              <a href="#work">work</a>
              <a href="#skills">skills</a>
              <a href="#contact">contact</a>
            </nav>

            <div className="app__nav-perch" aria-hidden="true">
              <div className="app__nav-sushi">
                <SushiPlatter visible suppressEnter width="100%" />
              </div>
              <div className="app__nav-sitter">
                <SittingCharacter width="100%" />
              </div>
            </div>
          </header>

          <PortfolioSections />
        </>
      )}

      <div
        className={[
          'app__stage',
          hasArrived && 'app__stage--done',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {phase === 'idle' && (
          <button
            type="button"
            className="app__cta"
            onClick={() => setPhase('sushi-pop')}
          >
            get to know me
          </button>
        )}

        {showCornerIdle && (
          <div ref={idleCharacterRef} className="app__character">
            <IdleCharacter
              width="100%"
              lookOffset={looking ? SUSHI_LOOK : { x: 0, y: 0 }}
              expression={phase === 'sushi-look' || (isChasing && !runnerLockedIn) ? 'excited' : 'idle'}
            />
          </div>
        )}
      </div>

      {showRunner && (
        <div ref={characterAnchorRef} className="app__runner-anchor">
          <RunningCharacter width="100%" playing={isChasing} />
        </div>
      )}

      {sushiVisible && !hasArrived && (
        <div
          ref={sushiAnchorRef}
          className="app__sushi-anchor"
        >
          <SushiPlatter
            visible
            playPop={playPop}
            suppressEnter={isChasing}
            width="100%"
            onPopEnd={() => setPhase('sushi-look')}
          />
        </div>
      )}
    </main>
  )
}
