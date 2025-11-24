import { useState } from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="all-pages-main-container">
      <BrowserRouter>
        <Navbar />
        <div className="all-pages-content-area">
          <Routes>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
