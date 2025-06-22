import React from 'react'
import logo from '../../assets/symbol.png'
import search from '../../assets/search.svg'
import arrow from '../../assets/arrow-down.svg'
import searchwt from '../../assets/search.svg'
import './Navbar.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import addbtn from '../../assets/addButton.png'
export const Navbar = ({toggleModal,status,sellModal}) => {

const [user]=useAuthState(auth)
  return (
    <div className='navbar'>
     <nav className='fixed z-17 w-full overflow-auto p-2 pb-0 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white '>
        <img src={logo} alt='' className='w-12' />

        <div className='relative location-search ml-5'>
            <img src={search} alt='' className='absolute top-4 left-2 w-5'></img>
            <input placeholder='Search city,area, or locality...' type='text' name='' id='' 
            className='w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus '
            ></input>
            <img src={arrow} alt='' className='absolute top-4 right-3 w-5 cursor-pointer'></img>
        </div>
        <div className='ml-5 mr-2 relative w-full main-search'>
          <input type="text" placeholder='Find Cars,Mobile Phones,and More...'
          className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300 '
          />
          <div style={{backgroundColor:'#002f34'}}
          className='flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12'>
            <img src={searchwt} alt=''  className='w-5'/>
          </div>
        </div>
        <div className='mx-1 sm:ml-5 sm:mr-5 relative lang'>
          <p className='font-bold mr-3'>English</p>
          <img src={arrow} alt='' className='w-5 cursor-pointer' />
        </div>
      
     {!user?
      <p className='font-bold underline ml-5 cursor-pointer' onClick={()=>toggleModal()} style={{color:'#002f34'}}>Login</p>:
      
      <div className='relative'>
      <p style={{color:'#002f34'}}>{user.displayName?.split(' ')[0]}</p>
      </div>
     }
     <img onClick={user?sellModal:toggleModal} src={addbtn} className='w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer' alt=''></img>
   
     </nav>
     <div className='w-full z-10 flex shadow-md  pt-20 pl-10 sm:pl-44 md:pr-44 sub-lists'>
      <ul className='list-none flex items-center justify-between w-full'>
      <div className='flex flex-shrink-0'>
        <p className='font-semibold uppercase all-cats'>All Categories</p>
      <img className='w-4 ml-2' src={arrow} alt=''></img>
      
      </div>
       <li>Cars</li>
                    <li>Motorcycles</li>
                    <li>Mobile Phones</li>
                    <li>For sale : Houses & Apartments</li>
                    <li>Scooter</li>
                    <li>Commercial & Other Vehicles</li>
                    <li>For rent : Houses & Apartments</li>
      </ul>
     </div>
      </div>
     
  )
}
