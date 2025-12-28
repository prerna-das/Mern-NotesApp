import React from 'react'
import {Route, Routes} from "react-router"
import Homepage from './pages/Homepage.jsx' // importing component(Homepage) into App.jsx
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import {toast} from 'react-hot-toast'
const App = () => {
  return ( 
  <div className='relative min-h-screen w-full' >
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/create" element={<CreatePage/>} />
      <Route path="/note/:id" element={<NoteDetailPage/>} />
    </Routes>
  </div>)
}

export default App