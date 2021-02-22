import { useState } from 'react'
import NodeCanvas from './NodeCanvas'

export default function App() {
  const [state, setState] = useState([])

  return (
    <div id="app">
      <NodeCanvas onChange={setState} />
      <pre id="debugger">{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
