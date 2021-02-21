import { useContainer } from './ContainerContext'
import { motion, useTransform } from 'framer-motion'

export const SelectorRect = () => {
  const {
    selector: { selecting, startX, startY, currentX, currentY }
  } = useContainer()
  const x = useTransform(currentX, (v) => Math.min(v, startX.get()))
  const y = useTransform(currentY, (v) => Math.min(v, startY.get()))
  const width = useTransform(currentX, (v) => Math.abs(v - startX.get()))
  const height = useTransform(currentY, (v) => Math.abs(v - startY.get()))

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
