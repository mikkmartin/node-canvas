import { FC, useRef } from 'react'
import { useContainer } from '../ContainerContext'
import { useNode } from './NodeContext'
import { motion, PanInfo, motionValue } from 'framer-motion'

type SocketT = { type: 'input' | 'output'; value: number; nth: number }
export const Socket: FC<SocketT> = ({ type, value, nth }) => {
  const { width, x: _x, y: _y, id: nodeId } = useNode()
  const { wires, setWires } = useContainer()
  const wireId = useRef<string>()
  const x = type === 'input' ? 0 : width - 16
  const cx = type === 'input' ? 7 : width - 7
  const cy = 28 + nth * 16
  const y = 20 + nth * 16

  const handleDragStart = (ev: any) => {
    ev.stopPropagation()
    ev.preventDefault()
    if (type === 'output') {
      const startX = cx + _x.get()
      const startY = cy + _y.get()
      const newId = Math.random() + ''
      wireId.current = newId
      const newWire = {
        id: newId,
        start: nodeId,
        x1: motionValue(startX),
        y1: motionValue(startY),
        x2: motionValue(startX),
        y2: motionValue(startY)
      }
      setWires([...wires, newWire])
    }
  }

  const handlePan = (_, info: PanInfo) => {
    const w = wires.find((w) => (w.id = wireId.current))
    if (!w) return
    w.x2.set(info.point.x)
    w.y2.set(info.point.y)
  }

  const handlePanEnd = () => {
    console.log('handlePanEnd')
  }

  return (
    <motion.g
      onTapStart={handleDragStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      whileHover="hovered">
      <motion.rect x={x} y={y} fill="rgba(0,0,0,0)" width="16" height="16" />
      <circle cx={cx} cy={cy} r="2" fill="gray" />
      <motion.circle
        strokeWidth="2"
        stroke="transparent"
        style={{ fill: 'transparent' }}
        variants={{
          hovered: { stroke: 'gray' }
        }}
        cx={cx}
        cy={cy}
        r="5"
        fill="none"
      />
      {type === 'input' && (
        <text opacity={0.5} x={x + 16} y={y + 12}>
          {value}
        </text>
      )}
      {type === 'output' && (
        <text opacity={0.5} x={x - 6} y={y + 12}>
          {value}
        </text>
      )}
    </motion.g>
  )
}
