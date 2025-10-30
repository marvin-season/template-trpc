'use client'

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

export type CanvasEditorMode = 'erase' | 'move'

export interface CanvasStroke {
  tool: 'pen' | 'eraser'
  strokeWidth: number // in image coordinate space
  points: number[] // [x1, y1, x2, y2, ...] in image coordinate space
}

export interface CanvasEditorRef {
  getMaskBase64: () => string | null
  clear: () => void
  undo: () => void
  redo: () => void
  setMode: (mode: CanvasEditorMode) => void
}

export interface CanvasEditorProps {
  src: string
  className?: string
  style?: CSSProperties
  // Stage viewport size; component auto-fits image inside on mount
  viewportWidth?: number
  viewportHeight?: number
  // initial brush size (px in image space)
  initialBrushSize?: number
  // min/max zoom percentage (100-300)
  minZoomPercent?: number
  maxZoomPercent?: number
  // controlled mode (optional)
  mode?: CanvasEditorMode
  onModeChange?: (mode: CanvasEditorMode) => void
  // change callbacks (optional)
  onStrokesChange?: (strokes: CanvasStroke[]) => void
  // Whether to render checkerboard background under the image
  showCheckerboard?: boolean
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

function getDevicePixelRatio(ctx: CanvasRenderingContext2D) {
  // account for HiDPI displays
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const bsr =
    (ctx as any).webkitBackingStorePixelRatio ||
    (ctx as any).mozBackingStorePixelRatio ||
    (ctx as any).msBackingStorePixelRatio ||
    (ctx as any).oBackingStorePixelRatio ||
    (ctx as any).backingStorePixelRatio ||
    1
  return dpr / bsr
}

export const CanvasEditor = forwardRef<CanvasEditorRef, CanvasEditorProps>(
  (
    {
      src,
      className,
      style,
      viewportWidth = 720,
      viewportHeight = 480,
      initialBrushSize = 50,
      minZoomPercent = 100,
      maxZoomPercent = 300,
      mode: controlledMode,
      onModeChange,
      onStrokesChange,
      showCheckerboard = true,
    },
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
    const offscreenMaskRef = useRef<HTMLCanvasElement | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)

    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [initScale, setInitScale] = useState(1)
    const [zoomPercent, setZoomPercent] = useState(100)
    const [brushSize, setBrushSize] = useState(initialBrushSize)
    const [isDrawing, setIsDrawing] = useState(false)
    const [strokes, setStrokes] = useState<CanvasStroke[]>([])
    const undoStack = useRef<CanvasStroke[][]>([])
    const redoStack = useRef<CanvasStroke[][]>([])

    const [internalMode, setInternalMode] = useState<CanvasEditorMode>('erase')
    const isErasing = (controlledMode || internalMode) === 'erase'

    // panning
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const lastPanPoint = useRef<{ x: number; y: number } | null>(null)

    // Derived scale in CSS transform space
    const cssScale = useMemo(
      () => initScale * (zoomPercent / 100),
      [initScale, zoomPercent],
    )

    const imageContainerSize = useMemo(() => {
      return { width: imageSize.width, height: imageSize.height }
    }, [imageSize])

    useEffect(() => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.decoding = 'async'
      img.onload = () => {
        imageRef.current = img
        setImageSize({ width: img.width, height: img.height })
        setImageLoaded(true)

        // fit into viewport
        const scale =
          img.width > img.height
            ? viewportWidth / img.width
            : viewportHeight / img.height
        setInitScale(scale)
        setZoomPercent(100)

        // center
        const centered = {
          x: (viewportWidth - img.width * scale) / 2,
          y: (viewportHeight - img.height * scale) / 2,
        }
        setPan(centered)

        // prepare offscreen original-size mask canvas
        const off = document.createElement('canvas')
        off.width = img.width
        off.height = img.height
        offscreenMaskRef.current = off

        // prepare overlay canvas backing store based on dpr
        const overlay = overlayCanvasRef.current
        if (overlay) {
          const ctx = overlay.getContext('2d')
          if (ctx) {
            const dpr = getDevicePixelRatio(ctx)
            overlay.width = Math.round(viewportWidth * dpr)
            overlay.height = Math.round(viewportHeight * dpr)
            overlay.style.width = `${viewportWidth}px`
            overlay.style.height = `${viewportHeight}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          }
        }
      }
      img.src = src
      return () => {
        imageRef.current = null
      }
    }, [src, viewportWidth, viewportHeight])

    useEffect(() => {
      onStrokesChange?.(strokes)
    }, [strokes, onStrokesChange])

    const screenToImagePoint = (clientX: number, clientY: number) => {
      const wrapper = wrapperRef.current
      if (!wrapper) return null
      const rect = wrapper.getBoundingClientRect()
      const x = clientX - rect.left - pan.x
      const y = clientY - rect.top - pan.y
      const sx = x / cssScale
      const sy = y / cssScale
      return {
        x: clamp(sx, 0, imageContainerSize.width),
        y: clamp(sy, 0, imageContainerSize.height),
      }
    }

    const pushHistory = (next: CanvasStroke[]) => {
      undoStack.current.push(strokes)
      redoStack.current = []
      setStrokes(next)
    }

    const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (
      e,
    ) => {
      if (!imageLoaded) return
      if (isErasing) {
        setIsDrawing(true)
        const pt = screenToImagePoint(e.clientX, e.clientY)
        if (!pt) return
        const stroke: CanvasStroke = {
          tool: 'pen',
          strokeWidth: brushSize / initScale, // store normalized to image space; consumers interpret as-is
          points: [pt.x, pt.y],
        }
        pushHistory([...strokes, stroke])
      } else {
        lastPanPoint.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
      e,
    ) => {
      if (!imageLoaded) return
      if (isErasing && isDrawing) {
        const pt = screenToImagePoint(e.clientX, e.clientY)
        if (!pt) return
        setStrokes((prev) => {
          if (prev.length === 0) return prev
          const lastIndex = prev.length - 1
          const last = prev[lastIndex]!
          const updatedLast: CanvasStroke = {
            tool: last.tool,
            strokeWidth: last.strokeWidth,
            points: [...last.points, pt.x, pt.y],
          }
          return [...prev.slice(0, lastIndex), updatedLast]
        })
      } else if (!isErasing) {
        const lastPan = lastPanPoint.current
        if (lastPan) {
          const dx = e.clientX - lastPan.x
          const dy = e.clientY - lastPan.y
          lastPanPoint.current = { x: e.clientX, y: e.clientY }
          setPan((p) => ({ x: p.x + dx, y: p.y + dy }))
        }
      }
    }

    const handlePointerUpOrLeave: React.PointerEventHandler<
      HTMLDivElement
    > = () => {
      setIsDrawing(false)
      lastPanPoint.current = null
    }

    const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
      if (!imageLoaded || isErasing) return
      const delta = e.deltaY > 0 ? -10 : 10
      const next = clamp(zoomPercent + delta, minZoomPercent, maxZoomPercent)
      setZoomPercent(next)
    }

    // draw strokes on overlay canvas for preview
    useEffect(() => {
      const canvas = overlayCanvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // draw strokes in screen space for crisp rendering
      ctx.save()
      ctx.strokeStyle = 'rgba(255, 79, 81, 0.9)'
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      // map image-space points to screen-space: screen = pan + point * cssScale
      strokes.forEach((s) => {
        ctx.beginPath()
        for (let i = 0; i + 1 < s.points.length; i += 2) {
          const x = pan.x + s.points[i]! * cssScale
          const y = pan.y + s.points[i + 1]! * cssScale
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineWidth = s.strokeWidth * cssScale
        ctx.stroke()
      })
      ctx.restore()
      // optionally draw pointer in erase mode in future
    }, [cssScale, pan, strokes])

    // expose APIs
    useImperativeHandle(ref, () => ({
      getMaskBase64: () => {
        if (!imageRef.current) return null
        const mask = offscreenMaskRef.current
        if (!mask) return null
        // redraw from strokes into offscreen at original size
        const mctx = mask.getContext('2d')
        if (!mctx) return null
        mctx.clearRect(0, 0, mask.width, mask.height)
        mctx.save()
        mctx.fillStyle = 'rgba(255,0,0,1)'
        mctx.strokeStyle = 'rgba(255,0,0,1)'
        mctx.lineJoin = 'round'
        mctx.lineCap = 'round'
        strokes.forEach((s) => {
          mctx.beginPath()
          for (let i = 0; i + 1 < s.points.length; i += 2) {
            const x = s.points[i]!
            const y = s.points[i + 1]!
            if (i === 0) mctx.moveTo(x, y)
            else mctx.lineTo(x, y)
          }
          mctx.lineWidth = s.strokeWidth
          mctx.stroke()
        })
        mctx.restore()
        return mask.toDataURL('image/png')
      },
      clear: () => {
        undoStack.current.push(strokes)
        redoStack.current = []
        setStrokes([])
      },
      undo: () => {
        const prev = undoStack.current.pop()
        if (prev) {
          redoStack.current.push(strokes)
          setStrokes(prev)
        }
      },
      redo: () => {
        const next = redoStack.current.pop()
        if (next) {
          undoStack.current.push(strokes)
          setStrokes(next)
        }
      },
      setMode: (m) => {
        setInternalMode(m)
        onModeChange?.(m)
      },
    }))

    // Controls API exposed via props? Keep core minimal. Consumers can control via ref.

    return (
      <div
        ref={wrapperRef}
        className={className}
        style={{
          width: viewportWidth,
          height: viewportHeight,
          position: 'relative',
          userSelect: 'none',
          ...style,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        onWheel={handleWheel}
        onContextMenu={(e) => e.preventDefault()}
      >
        {showCheckerboard && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          />
        )}
        {/* Image + drawing overlay inside transformed container */}
        <div
          style={{
            position: 'absolute',
            left: pan.x,
            top: pan.y,
            width: imageContainerSize.width,
            height: imageContainerSize.height,
            transform: `scale(${cssScale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none', // let wrapper capture events
          }}
        >
          {imageLoaded && (
            <img
              src={src}
              alt='image'
              style={{ display: 'block', width: '100%', height: '100%' }}
            />
          )}
          {/* strokes preview by re-drawing into an HTML canvas at image-space, then scaled by CSS */}
          <canvas
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}
            ref={(node) => {
              if (!node) return
              // keep size in image-space for future needs but do not draw strokes here
              node.width = imageContainerSize.width
              node.height = imageContainerSize.height
              const ctx = node.getContext('2d')
              if (!ctx) return
              ctx.clearRect(0, 0, node.width, node.height)
            }}
          />
        </div>

        {/* overlay canvas for potential future effects; currently used for DPI backing store */}
        <canvas
          ref={overlayCanvasRef}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />

        {/* Minimal helper controls (optional external UI recommended) */}
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            display: 'flex',
            gap: 8,
          }}
        >
          <button
            onClick={() => {
              const next = !isErasing ? 'erase' : 'move'
              setInternalMode(next)
              onModeChange?.(next)
            }}
            style={{ padding: '6px 10px', background: '#fff', borderRadius: 8 }}
          >
            {isErasing ? '擦除' : '移动'}
          </button>
          <input
            type='range'
            min={1}
            max={100}
            value={clamp(Math.round(brushSize), 1, 100)}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <button
            onClick={() =>
              setZoomPercent((z) =>
                clamp(z - 10, minZoomPercent, maxZoomPercent),
              )
            }
            style={{ padding: '6px 10px', background: '#fff', borderRadius: 8 }}
          >
            -
          </button>
          <div
            style={{ padding: '6px 10px', background: '#fff', borderRadius: 8 }}
          >
            {zoomPercent}%
          </div>
          <button
            onClick={() =>
              setZoomPercent((z) =>
                clamp(z + 10, minZoomPercent, maxZoomPercent),
              )
            }
            style={{ padding: '6px 10px', background: '#fff', borderRadius: 8 }}
          >
            +
          </button>
        </div>
      </div>
    )
  },
)

CanvasEditor.displayName = 'CanvasEditor'

export default CanvasEditor
