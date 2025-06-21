import React, { useState } from 'react'
import { Navbar } from '../../Navbar/Navbar'
import Login from '../../Modal/Login/Login'
import Sell from '../../Modal/Sell'

export const Home = () => {
  const [openModal,setOpenModal]=useState(false)
  const [openSellModal,setSellModal]=useState(false)

  const toggleModal=()=>
    {
        setOpenModal(!openModal)
  }

  
  const toggleModalSell=()=>
    {
        setSellModal(!openSellModal)
  }

  return (
    <div>
        <Navbar toggleModal={toggleModal} isOpen={openModal} sellModal={setSellModal} />
        <Login toggleModal={toggleModal} isOpen={openModal} />
        <Sell toggleModalSell={toggleModalSell} status={openSellModal} />
    </div>
  )
}
