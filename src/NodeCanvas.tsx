import './styles.scss'
import { ContainerProvider } from './ContainerContext'
import Node from './Node'
import { Container } from './Container'

export default function NodeCanvas() {
  return (
    <ContainerProvider>
      <Container>
        <Node type="number" inputs={[2]} outputs={[2]} />
        <Node type="number" inputs={[3, 5]} outputs={[2]} />
      </Container>
    </ContainerProvider>
  )
}
