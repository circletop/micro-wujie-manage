import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 这些生命周期函数将允许 wujie 正确管理应用
if (window.__POWERED_BY_WUJIE__) {
  let root
  window.__WUJIE_MOUNT = () => {
    root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
  window.__WUJIE_UNMOUNT = () => {
    root.unmount()
  }
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}