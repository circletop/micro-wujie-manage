import React, { useEffect, useState } from 'react'

function App() {
  const [globalState, setGlobalState] = useState(null)

  useEffect(() => {
    if (window.__WUJIE_GLOBAL__) {
      setGlobalState(window.__WUJIE_GLOBAL__.globalState)
    }
  }, [])

  function incHost() {
    if (window.__WUJIE_GLOBAL__ && window.__WUJIE_GLOBAL__.inc) {
      window.__WUJIE_GLOBAL__.inc()
      // trigger re-read
      setGlobalState({ ...window.__WUJIE_GLOBAL__.globalState })
    }
  }

  return (
    <div className="app">
      <h1>React Micro App</h1>
      <p>This is a React micro application</p>
      {globalState && (
        <div>
          <p>Host user: {globalState.user}</p>
          <p>Host count: {globalState.count}</p>
          <button onClick={incHost}>Increment host count</button>
        </div>
      )}
    </div>
  )
}

export default App