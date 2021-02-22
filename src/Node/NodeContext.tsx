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
  deselect: () => void
}

type Box2D = {
  x: number
  y: number
  width: number
  height: number
}

//@ts-ignore
const Context = createContext<Node>()

const isIntersecting = (a: Box2D, b: Box2D) => {
  return (
    Math.abs(a.x - b.x) * 2 < a.width + b.width &&
    Math.abs(a.y - b.y) * 2 < a.height + b.height
  )
}

let currentY = 20
let _nodes: any = []
export const NodeProvider: FC<NodeProps> = ({ children, ...rest }) => {
  const { nodes, setNodes, selector } = useContainer()
  const [id] = useState(Math.random() + '')
  const width = 100

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
        return node
      })
    )
  }

  const deselect = () => {
    setNodes(
      nodes.map((node) => {
        if (node.id === id) node.selected = false
        return node
      })
    )
  }

  useEffect(() => {
    _nodes.push({ id, selected: false })
    setNodes(_nodes)
  }, [])

  useEffect(() => {
    const unlisten = selector.currentX.onChange(() => {
      const selectorBox: Box2D = {
        x: Math.min(selector.currentX.get(), selector.startX.get()),
        y: Math.min(selector.currentY.get(), selector.startY.get()),
        width: Math.abs(selector.currentX.get() - selector.startX.get()),
        height: Math.abs(selector.currentY.get() - selector.startY.get())
      }
      const nodeBox: Box2D = {
        x: x.get(),
        y: y.get(),
        width,
        height
      }
      const intersecting = isIntersecting(selectorBox, nodeBox)
      /*
      setNodes(
        [...nodes].map((node) => {
          if (node.id === id && intersecting) node.selected = true
          return node
        })
        )
      */
    })
    return () => unlisten()
  }, [])

  const selected = Boolean(nodes.find((node) => node.id === id)?.selected)

  return (
    <Context.Provider
      value={{
        x,
        y,
        width,
        id,
        height,
        selected,
        select,
        deselect,
        ...rest
      }}>
      {children}
    </Context.Provider>
  )
}

export const useNode = () => useContext(Context)
