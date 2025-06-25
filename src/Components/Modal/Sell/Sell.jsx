import React, { useState } from 'react'
import Input from '../../Input/Input'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { userAuth } from '../../Context/Auth';
import { fetchFromFireStore, fireStore } from '../../firebase/firebase'
import { addDoc,collection } from 'firebase/firestore'
import loading from '../../../assets/loading.gif'
import fileUpload from '../../../assets/fileUpload.svg'
import close from '../../../assets/close.svg'
import { toast } from 'react-toastify';


const Sell = ({ toggleModalSell,status,setItems}) => {
  const [title,setTitle]=useState()
  const [category,setCategory]=useState()
  const [price,setPrice]=useState()
  const [description,setDescription]=useState()
  const [submitting,setSubmiting]=useState(false)
 const [image,setImage]=useState(null)

  const auth=userAuth();
 

const handleImageUpload=(event)=>
{
  if(event.target.files)
  {
    setImage(event.target.files[0])
  }
}


  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    if(!auth?.user)
    {
        toast.warning('Please login to continue');
        return;
    }
    setSubmiting(true)
    const readImageAsDataUrl=(file)=>
    {
      return new Promise((resolve,reject)=>
      {
        const reader=new FileReader();
        reader.onloadend=()=>
        {
          const imageUrl=reader.result
          localStorage.setItem(`image_${file.name}`,imageUrl)
        resolve(imageUrl)
        }
        reader.onerror=reject;
        reader.readAsDataURL(file)
      })
    }
    let imageUrl='';
    if(image)
    {
      try {
        imageUrl=await readImageAsDataUrl(image)

      } catch (error) {
        console.log(error);
        alert('failed to read image')
        return;
      }
    }

    const trimmedTitle=title.trim()
    const trimmedCategory=category.trim();
    const trimmedPrice=price.trim();
    const trimmedDescription=description.trim()

    if(!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription)
    {
        alert('all fields required')
        return;
    }

    try {
        await addDoc(collection(fireStore,'products'),{
            title,
            category,
            price,
            imageUrl,
            description,
            userId:auth.user.uid,
            userName:auth.user.displayName || 'Anonymous',
            createAt:new Date().toDateString()

        })
        setImage(null)
        const datas=await fetchFromFireStore();
        setItems(datas)
        toggleModalSell();
    } catch (error) {
        console.log("error"+error);
        
    }finally{
        setSubmiting(false)
    }
  }

  return (
    <div>
        <Transition appear show={status} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={()=>toggleModalSell()}
      >
        <div className="min-h-auto px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            ​
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-md p-4 md:h-auto inline-block align-middle transform bg-white shadow-xl rounded-lg">

              <img
                onClick={() => {
                  toggleModalSell();
                  setImage(null);
                }}
                className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
                src={close}
                alt=""
              />

              {/* Modal Body */}
              <div
                className="bg-white h-auto p-0 rounded-md"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="p-6 pl-8 pr-8 pb-8">
                  <p className="font-bold text-lg mb-3">Sell Item</p>

                  <form onSubmit={handleSubmit}>
                    <Input setInput={setTitle} placeholder="Title"  />
                    <Input setInput={setCategory} placeholder="category"  />
                    <Input setInput={setPrice} placeholder="Price"  />
                    <Input setInput={setDescription} placeholder="Description"  />

                    <div className="pt-2 w-full relative">
                      {image ? (
                        <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                          <img className="object-contain" src={URL.createObjectURL(image)} alt="" />
                        </div>
                      ) : (
                        <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                          <input
                          onChange={handleImageUpload}
                            type="file"
                            className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30"
                            required
                          />

                          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                            <img className="w-12" src={fileUpload} alt="" />
                            <p className="text-center text-sm pt-2">Click to upload images</p>
                            <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {submitting ? (
                      <div className="w-full flex h-14 justify-center pt-4 pb-2">
                        <img className="w-32 object-cover" src={loading} alt="" />
                      </div>
                    ) : (
                      <div className="w-full pt-2">
                        <button
                          className="w-full p-3 rounded-lg text-white"
                          style={{ backgroundColor: '#002f34' }}
                        >
                          Sell Item
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </div>
  )
}

export default Sell