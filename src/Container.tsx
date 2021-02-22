import { useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { SelectorRect } from './SelectorRect'
import { useContainer } from './ContainerContext'
//import { Wires } from './Wires'

export const Container = ({ children }) => {
  const {
    deSelectAllNodes,
    selector: { startX, startY, currentX, currentY, selecting, setSelecting }
  } = useContainer()
  const containerRef = useRef<SVGSVGElement>()

  const handleOnPan = (_, info: PanInfo) => {
    if (!selecting) setSelecting(true)
    if (startX.get() === 0) startX.set(info.point.x)
    if (startY.get() === 0) startY.set(info.point.y)
    deSelectAllNodes()
    currentX.set(info.point.x)
    currentY.set(info.point.y)
  }

  const handleOnPanEnd = () => {
    if (selecting) setSelecting(false)
    startX.set(0)
    startY.set(0)
  }

  const handleTap = () => {
    deSelectAllNodes()
  }

  return (
    <motion.svg
      className="container"
      width="100%"
      height="100%"
      onTap={handleTap}
      onPan={handleOnPan}
      onPanEnd={handleOnPanEnd}
      ref={containerRef}>
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity=".3" />
        </filter>
      </defs>
      {children}
      {/*
      <Wires />
       */}
      <SelectorRect />
    </motion.svg>
  )
}
