import { createContext, FC, useContext, useEffect, useState } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'
import { useContainer } from '../ContainerContext'

export type NodeProps = {
  type: string
  id?: string
  inputs?: number[]
  outputs?: number[]
}

type Node = NodeProps & {
  width: number
  height: number
  id: string
  x: MotionValue
  y: MotionValue
  selected: boolean
  select: () => void
}

//@ts-ignore
const Context = createContext<Node>()

let currentY = 20
let _nodes: any = []
export const NodeProvider: FC<NodeProps> = ({ children, ...rest }) => {
  const { nodes, setNodes } = useContainer()
  const [id] = useState(Math.random() + '')

  const ioAmount = Math.max(
    rest.inputs ? rest.inputs.length : 0,
    rest.outputs ? rest.outputs.length : 0,
    1
  )
  const x = useMotionValue(20)
  const y = useMotionValue(currentY)
  const height = 24 + ioAmount * 16
  currentY += height

  const select = () => {
    setNodes(
      nodes.map((node) => {
        if (node.id === id) node.selected = true
        else node.selected = false
        return node
      })
    )
  }

  useEffect(() => {
    _nodes.push({ id, selected: false })
    setNodes(_nodes)
  }, [])

  const selected = Boolean(nodes.find((node) => node.id === id)?.selected)

  return (
    <Context.Provider
      value={{
        x,
        y,
        width: 100,
        id,
        height,
        selected,
        select,
        ...rest
      }}>
      {children}
    </Context.Provider>
  )
}

export const useNode = () => useContext(Context)
