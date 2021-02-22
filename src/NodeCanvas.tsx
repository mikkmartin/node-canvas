import './styles.scss'
import { FC } from 'react'
import { ContainerProvider } from './ContainerContext'
import Node from './Node'
import { Container } from './Container'

const NodeCanvas: FC<{ onChange: (state: any) => void }> = ({ onChange }) => {
  return (
    <ContainerProvider onChange={onChange}>
      <Container>
        <Node key="one" type="number" inputs={[2]} outputs={[2]} />
        <Node key="two" type="number" inputs={[3, 5]} outputs={[2]} />
      </Container>
    </ContainerProvider>
  )
}

export default NodeCanvas
