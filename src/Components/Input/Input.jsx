import React from 'react'

const Input = ({setInput,placeholder}) => {
  return (
    <div className='pt-2 w-full relative'>
     <input type='text' placeholder={placeholder} name='' id='' onChange={(e)=>setInput(e.target.value)}
     className='w-full border-2 border-black rounded-md p-3 pt-4 pb-2 focus:outline-none peer' required></input>
    <label className='absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:text-sm transition-all duration-20 peer-placeholder-shown:top-5' htmlFor=''>{placeholder}</label>
    </div>
  
  )
}

export default Input