import React, { useState } from 'react'
import Input from '../Modal/Sell'
import { userAuth } from '../Context/Auth'
import { fireStore } from '../firebase/firebase'
import { addDoc } from 'firebase/firestore/lite'
import { collection } from 'firebase/firestore'
const Sell = ({ toggleModalSell,status}) => {
  const [title,setTitle]=useState()
  const [category,setCategory]=useState()
  const [price,setPrice]=useState()
  const [description,setDescription]=useState()
  const [submitting,setSubmiting]=useState()

  const auth=userAuth();
  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    if(!auth?.user)
    {
        alert('Please login to continue');
        return;
    }

    const trimmedTitle=title.trim()
    const trimmedCategory=category.trim();
    const trimmedPrice=price.trim();
    const trimmedDescription=description.trim()

    if(!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription)
    {
        alert('all fields required')
    }

    try {
        await addDoc(collection(fireStore,'Products'),{
            title,
            category,
            price,
            description,
            userId:auth.user.uId,
            userName:auth.user.displayName || 'Anonymous',
            createAt:new Data().toDateString()

        })
        toggleModalSell();
    } catch (error) {
        console.log("error");
        
    }finally{
        setSubmiting(false)
    }
  }

  return (
    <div>
        <Transition appear show={status} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-black"
        onClose={toggleModalSell}
      >
        <div className="min-h-screen px-4 text-center">
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
            <div className="relative w-full max-w-md p-4 md:h-auto inline-block align-middle transform bg-white shadow-xl rounded-lg dark:bg-gray-700">
              {/* Close Button */}
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
                className="bg-white h-96 p-0 rounded-md"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="p-6 pl-8 pr-8 pb-8">
                  <p className="font-bold text-lg mb-3">Sell Item</p>

                  <form onSubmit={handleSubmit}>
                    <Input setInput={setTitle} placeholder="Title" />
                    <Input setInput={setCategory} placeholder="category" />
                    <Input setInput={setPrice} placeholder="Price" />
                    <Input setInput={setDescription} placeholder="Description" />

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