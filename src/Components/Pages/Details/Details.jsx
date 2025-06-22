import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ItemsContext } from '../../Context/Item'
import Login from '../../Modal/Login/Login'
import Sell from '../../Modal/Sell'
import { Navbar } from '../../Navbar/Navbar'

const Details = () => {
    const location=useLocation()
    const {item}=location.state || {}

    const [openModal,setModal]=useState(false)
    const [openModalSell,setModalSell]=useState(false)
     
    const {items,setItems}=ItemsContext();
    const toggleModal=()=>setModal(!openModal)
      const toggleModalSell=()=>setModalSell(!openModalSell)
    
    return (
    <div>
        <Navbar sellModal={toggleModalSell} toggleModal={toggleModal} staus={openModal} />
        <Login toggleModal={toggleModal} isOpen={openModal} />
        <div className=' grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40 '>

            <div className='border-2 w-full rounded-lg flex justify-center overflow-hidden h-96'>
                <img src={item?.imageUrl} className='object-cover' alt={item?.title}/>
            </div>
            <div className='flex flex-col relative w-full'>
                <p className='p-1 pl-0 text-2xl font-bold'>{item?.price}</p>
                  <p className='p-1 pl-0 text-base'>{item?.category}</p>
                   <p className='p-1 pl-0 text-xl font-bold'>{item?.title}</p>
                    <p className='p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full'>
                        {item?.description}</p>
                    <div className='w-full relative sm:relative md:absolute bottom-0 flex justify-between'>
                       <p className='p-1 pl-0 font-bold'>Seller :{item?.userName}</p>
                       <p className='p-1 pl-0 text-sm'>{item?.createdAt}</p>
                    </div>
                </div>     
                </div>
                <Sell toggleModalSell={toggleModalSell} status={openModal} setItems={setItems} />
    </div>
  )
}

export default Details