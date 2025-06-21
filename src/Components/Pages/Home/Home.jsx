import React, { useState } from 'react'
import { Navbar } from '../../Navbar/Navbar'
import Login from '../../Modal/Login/Login'

export const Home = () => {
  const [openModal,setOpenModal]=useState(false)
  const [openModalSell,setOpenModalSell]=useState(false)

  const toggleModal=()=>
    {
        setOpenModal(!openModal)
  }
  return (
    <div>
        <Navbar toggleModal={toggleModal} isOpen={openModal} />
        <Login toggleModal={toggleModal} isOpen={openModal} />
    </div>
  )
}
