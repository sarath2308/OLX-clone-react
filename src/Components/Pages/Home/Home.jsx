import React, { useEffect, useState } from 'react'
import { Navbar } from '../../Navbar/Navbar'
import Login from '../../Modal/Login/Login'
import Sell from '../../Modal/Sell/Sell'
import Card from '../../cards/Card'
import { ItemsContext } from '../../Context/Item'
import { fetchFromFireStore } from '../../firebase/firebase'

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
        console.log("sell modal toggle clicked");
        
  }

  const {items,setItems}=ItemsContext();
 console.log("items from home"+items);
 
  

  useEffect(()=>
  {
   const getItems=async()=>
   {
    const datas=await fetchFromFireStore();
    setItems(datas)
   }
   getItems();
  },[])
 useEffect(()=>
{
  console.log('updated Items:',items)
  
})
  return (
    <div>
        <Navbar toggleModal={toggleModal} status={openModal} sellModal={toggleModalSell} />
        <Login toggleModal={toggleModal} isOpen={openModal} />
        {openSellModal && (
  <Sell toggleModalSell={toggleModalSell} status={openSellModal} setItems={setItems} />
)}
        <Card items={items || []} />
    </div>
  )
}
