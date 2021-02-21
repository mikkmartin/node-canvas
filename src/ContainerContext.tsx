import {
  createContext,
  useState,
  FC,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

type Node = string
type Values = {
  wires: WireT[]
  setWires: Dispatch<SetStateAction<WireT[]>>
  nodes: Node[]
  setNodes: Dispatch<SetStateAction<Node[]>>
  selector: {
    selecting: boolean
    setSelecting: Dispatch<SetStateAction<boolean>>
    startX: MotionValue
    startY: MotionValue
    currentX: MotionValue
    currentY: MotionValue
  }
}

export type WireT = {
  id: string
  start: string
  end?: string
  x1: MotionValue
  x2: MotionValue
  y1: MotionValue
  y2: MotionValue
}

//@ts-ignore
const Context = createContext<Values>()

export const ContainerProvider: FC = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [wires, setWires] = useState<WireT[]>([])
  const selectorStartX = useMotionValue(0)
  const selectorStartY = useMotionValue(0)
  const selectorCurrentX = useMotionValue(0)
  const selectorCurrentY = useMotionValue(0)
  const [selecting, setSelecting] = useState(false)

  return (
    <Context.Provider
      value={{
        wires,
        setWires,
        nodes,
        setNodes,
        selector: {
          selecting,
          setSelecting,
          startX: selectorStartX,
          startY: selectorStartY,
          currentX: selectorCurrentX,
          currentY: selectorCurrentY
        }
      }}>
      {children}
    </Context.Provider>
  )
}

export const useContainer = () => useContext(Context)
