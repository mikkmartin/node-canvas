import { FC } from 'react'
import { NodeProvider, NodeProps } from './NodeContext'
import { Label } from './Label'
import { Container } from './Container'
import { IO } from './IO'

export const Node: FC<NodeProps> = (props) => {
  return (
    <NodeProvider {...props}>
      <Container>
        <Label />
        <IO />
      </Container>
    </NodeProvider>
  )
}
