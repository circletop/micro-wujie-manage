import React, { useEffect, useState, useCallback } from 'react'

function App() {
  const [globalState, setGlobalState] = useState(() => (window.__WUJIE_GLOBAL__ ? window.__WUJIE_GLOBAL__.globalState : null))

  const handleChange = useCallback((detail) => {
    if (!detail) return
    // detail may be { changes, state }
    const state = detail.state || detail
    setGlobalState(state)
  }, [])

  useEffect(() => {
    function onCustomEvent(e) {
      handleChange(e.detail && (e.detail.state || e.detail))
    }

    function onMessage(e) {
      try {
        const msg = e.data
        if (msg && msg.type === 'wujie:global:change') {
          handleChange(msg.payload && (msg.payload.state || msg.payload))
        } else if (msg && msg.type === 'wujie:global:init') {
          handleChange(msg.payload && (msg.payload.state || msg.payload))
        }
      } catch (err) {}
    }

    window.addEventListener('wujie:global:change', onCustomEvent)
    window.addEventListener('wujie:global:init', onCustomEvent)
    window.addEventListener('message', onMessage)

    // fallback: if direct bridge exists, use it and also attempt to subscribe
    if (window.__WUJIE_GLOBAL__) {
      setGlobalState(window.__WUJIE_GLOBAL__.globalState)
      if (window.__WUJIE_GLOBAL__.subscribe) {
        const unsub = window.__WUJIE_GLOBAL__.subscribe((changes, state) => {
          setGlobalState(state)
        })
        return () => {
          unsub()
          window.removeEventListener('wujie:global:change', onCustomEvent)
          window.removeEventListener('wujie:global:init', onCustomEvent)
          window.removeEventListener('message', onMessage)
        }
      }
    }

    return () => {
      window.removeEventListener('wujie:global:change', onCustomEvent)
      window.removeEventListener('wujie:global:init', onCustomEvent)
      window.removeEventListener('message', onMessage)
    }
  }, [handleChange])

  function incHost() {
    if (window.__WUJIE_GLOBAL__ && window.__WUJIE_GLOBAL__.inc) {
      window.__WUJIE_GLOBAL__.inc()
      // optimistic update will be applied by event listener
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