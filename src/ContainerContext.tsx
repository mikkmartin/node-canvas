import {
  createContext,
  useState,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

type Node = {
  id: string
  selected: boolean
}
type Values = {
  wires: WireT[]
  setWires: Dispatch<SetStateAction<WireT[]>>
  nodes: Node[]
  setNodes: Dispatch<SetStateAction<Node[]>>
  deSelectAllNodes: () => void
  selectNode: () => void
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

type Props = {
  onChange: (state: any) => void
}

export const ContainerProvider: FC<Props> = ({
  children,
  onChange = () => {}
}) => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [wires, setWires] = useState<WireT[]>([])
  const selectorStartX = useMotionValue(0)
  const selectorStartY = useMotionValue(0)
  const selectorCurrentX = useMotionValue(0)
  const selectorCurrentY = useMotionValue(0)
  const [selecting, setSelecting] = useState(false)

  const deSelectAllNodes = () => {
    if (!Boolean(nodes)) return
    //if (Boolean(nodes.find((node) => !node.selected))) return
    setNodes(
      [...nodes].map((node) => {
        node.selected = false
        return node
      })
    )
  }

  const selectNode = (id: string) => {
    console.log({ id })
  }

  useEffect(() => {
    onChange(nodes)
  }, [onChange, nodes])

  return (
    <Context.Provider
      value={{
        wires,
        setWires,
        nodes,
        setNodes,
        selectNode,
        deSelectAllNodes,
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
