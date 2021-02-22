import { FC, useMemo, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { useNode } from './NodeContext'
import { useContainer } from '../ContainerContext'

export const Container: FC = ({ children }) => {
  const { wires, deSelectAllNodes } = useContainer()
  const { width, height, x, y, id, select, selected } = useNode()
  const startPos = useRef({ x: x.get(), y: y.get() })
  const size = { width, height }
  const wireStartPos = useRef<{ x: number; y: number }[]>([])
  const connectedWires = useMemo(() => wires.filter((w) => w.start === id), [
    wires,
    id
  ])

  const handlePanStart = () => {
    wireStartPos.current = connectedWires.map(({ x1, y1 }) => ({
      x: x1.get(),
      y: y1.get()
    }))
  }

  const handlePan = (_, info: PanInfo) => {
    const _x = Math.max(startPos.current.x + info.offset.x, 0)
    const _y = Math.max(startPos.current.y + info.offset.y, 0)
    x.set(_x)
    y.set(_y)
    connectedWires.forEach(({ x1, y1 }, i) => {
      x1.set(wireStartPos.current[i].x + info.offset.x)
      y1.set(wireStartPos.current[i].y + info.offset.y)
    })
  }

  const handlePanEnd = (_: any, info: PanInfo) => {
    //const { x, y } = info.offset
    startPos.current = {
      x: x.get(),
      y: y.get()
    }
  }

  const handleTapStart = (ev) => {
    ev.stopPropagation()
    deSelectAllNodes()
    select()
  }

  return (
    <motion.g
      style={{ x, y }}
      onTapStart={handleTapStart}
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}>
      <rect
        filter="url(#shadow)"
        stroke={selected ? 'red' : 'none'}
        {...size}
        fill="#4C4C4C"
        rx="8"
      />
      {children}
    </motion.g>
  )
}
