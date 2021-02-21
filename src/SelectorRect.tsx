import { useContainer } from './ContainerContext'
import { motion, useTransform } from 'framer-motion'

export const SelectorRect = () => {
  const {
    selector: { selecting, startX: x, startY: y, currentX, currentY }
  } = useContainer()
  const width = useTransform(currentX, (v) => v - x.get())
  const height = useTransform(currentY, (v) => v - y.get())

  if (!selecting) return null
  return (
    <motion.rect
      style={{
        x,
        y,
        width,
        height,
        stroke: 'white',
        strokeWidth: 1,
        fill: 'rgba(255, 255, 255, 0.1)'
      }}
    />
  )
}
