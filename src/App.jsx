import React from 'react'
import { Home } from './Components/Pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './Components/Pages/Details/details'
import Myads from './Components/Pages/myads/Myads'

const App = () => {
  return (
    <>
    
    <Routes>
            <Route path='/' element={<Home/>} />
      <Route path='/details' element={<Details />} />
      <Route path='/myads' element={<Myads />} />
    </Routes>
    </>
      
  )
}

export default App