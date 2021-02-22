import { useNode } from './NodeContext'

export const Label = () => {
  const { type, width } = useNode()
  return (
    <>
      <rect fill="rgba(255,255,255,0.07)" width={width} height="20" />
      <text
        x={width / 2}
        y="14"
        fontWeight="bold"
        textAnchor="middle"
        width={width}>
        {type}
      </text>
    </>
  )
}
