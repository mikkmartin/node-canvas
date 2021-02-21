import { createContext, FC, useContext, useEffect, useState } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'
import { useContainer } from '../ContainerContext'

export type NodeProps = {
  type: string
  inputs?: number[]
  outputs?: number[]
}

type Node = NodeProps & {
  width: number
  height: number
  id: string
  x: MotionValue
  y: MotionValue
}

//@ts-ignore
const Context = createContext<Node>()

let currentY = 20
export const NodeProvider: FC<NodeProps> = ({ children, ...rest }) => {
  const { nodes, setNodes } = useContainer()
  const [id, setId] = useState(Math.random() + '')

  useEffect(() => {
    setNodes([...nodes, id])
  }, [])

  const ioAmount = Math.max(
    rest.inputs ? rest.inputs.length : 0,
    rest.outputs ? rest.outputs.length : 0,
    1
  )
  const x = useMotionValue(20)
  const y = useMotionValue(currentY)
  const height = 24 + ioAmount * 16
  currentY += height
  return (
    <Context.Provider value={{ x, y, width: 100, id, height, ...rest }}>
      {children}
    </Context.Provider>
  )
}

export const useNode = () => useContext(Context)
