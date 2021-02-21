import { useNode } from './NodeContext'
import { Socket } from './Socket'

export const IO = () => {
  const { inputs = [], outputs = [] } = useNode()
  if (!inputs) return
  return (
    <>
      {inputs.map((input, i) => (
        <Socket key={'i-' + i} type="input" nth={i} />
      ))}
      {outputs.map((input, i) => (
        <Socket key={'o-' + i} type="output" nth={i} />
      ))}
    </>
  )
}
