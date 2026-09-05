import { useCallback, useRef, useState, type CSSProperties, type KeyboardEventHandler, type MouseEventHandler, type ReactNode, type Ref } from 'react'

type WaitForLayersProps = {
  layerCount: number
  className?: string
  style?: CSSProperties
  rootRef?: Ref<HTMLDivElement>
  role?: string
  tabIndex?: number
  'aria-label'?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>
  children: (api: {
    ready: boolean
    bindLayer: (src: string) => {
      onLoad: () => void
      ref: (el: HTMLImageElement | null) => void
    }
  }) => ReactNode
}

/**
 * Keeps a layered character hidden until all PNG layers have loaded.
 */
export function WaitForLayers({
  layerCount,
  className,
  style,
  rootRef,
  role,
  tabIndex,
  'aria-label': ariaLabel,
  onClick,
  onKeyDown,
  children,
}: WaitForLayersProps) {
  const [ready, setReady] = useState(false)
  const loadedRef = useRef(new Set<string>())

  const markLoaded = useCallback(
    (src: string) => {
      if (loadedRef.current.has(src)) return
      loadedRef.current.add(src)
      if (loadedRef.current.size >= layerCount) setReady(true)
    },
    [layerCount],
  )

  const bindLayer = useCallback(
    (src: string) => ({
      onLoad: () => markLoaded(src),
      ref: (el: HTMLImageElement | null) => {
        if (el?.complete && el.naturalWidth > 0) markLoaded(src)
      },
    }),
    [markLoaded],
  )

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        ...style,
        opacity: ready ? (style?.opacity ?? 1) : 0,
      }}
      data-layers-ready={ready ? 'true' : 'false'}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children({ ready, bindLayer })}
    </div>
  )
}
