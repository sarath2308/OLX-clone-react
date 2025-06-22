import React from 'react'
import { Home } from './Components/Pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './Components/Pages/Details/details'

const App = () => {
  return (
    <>
    <Routes>
            <Route path='/' element={<Home/>} />
      <Route path='/details' element={<Details />} />
    </Routes>
    </>
      
  )
}

export default App