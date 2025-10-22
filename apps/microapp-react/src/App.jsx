import React from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import MainContent from './AppMainContent'

function TestPage() {
  return (
    <div>
      <h2>React Micro App - Test Page</h2>
      <p>This is the /test page for the React micro app.</p>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/test">Test</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </HashRouter>
  )
}