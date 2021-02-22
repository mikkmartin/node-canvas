import { useState } from 'react'
import NodeCanvas from './NodeCanvas'

export default function App() {
  const [state, setState] = useState([])
  console.log(state)

  return (
    <div id="app">
      <NodeCanvas
        onChange={(s) => {
          console.log(s)
          setState(s)
        }}
      />
      <pre id="debugger">{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
