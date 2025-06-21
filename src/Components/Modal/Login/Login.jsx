import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import mobile from '../../../assets/mobile.svg';
import guitar from '../../../assets/guita.png';
import love from '../../../assets/love.png';
import avatar from '../../../assets/avatar.png';
import close from '../../../assets/close.svg';
import google from '../../../assets/google.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';

const Login = ({ toggleModal, isOpen, onGoogleClick }) => {

const handleClick=async()=>
{
  try{
  const result=await signInWithPopup(auth,provider);
  toggleModal();
  console.log("user",result.user);
  
  }
  catch(error)
  {
console.log(error);

  }
}





  const [isOpenState, setIsOpenState] = useState(isOpen || false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: guitar,
      text: 'Help us become one of the safest place to buy and sell.',
    },
    {
      image: love,
      text: 'Close deals from the comfort of your home.',
    },
    {
      image: avatar,
      text: 'Keep all your favorites in one place.',
    },
  ];

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  function closeModal() {
    setIsOpenState(false);
    if (toggleModal) toggleModal();
  }

  function openModal() {
    setIsOpenState(true);
    if (toggleModal) toggleModal();
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Transition appear show={isOpenState} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto rounded-none"
        onClose={closeModal}
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
            <div className="relative w-full max-w-md p-4 md:h-auto inline-block align-middle transform bg-white shadow-xl rounded-lg">
              {/* Close Button */}
              <img
                onClick={closeModal}
                className="w-6 absolute z-10 top-4 right-4 cursor-pointer"
                src={close}
                alt="Close"
              />

              {/* Slide Show with Arrows */}
              <div
                className="p-6 pl-2 pr-2 bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-56 pb-5 rounded-none flex items-center justify-center">
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 text-black bg-transparent focus:outline-none"
                  >
                    ←
                  </button>
                  <div className="flex flex-col items-center justify-center">
                    <img
                      className="w-24 pb-5"
                      src={slides[currentSlide].image}
                      alt={`Slide ${currentSlide + 1}`}
                    />
                    <p
                      style={{ color: '#002f34' }}
                      className="w-60 sm:w-72 text-center pb-5 font-semibold"
                    >
                      {slides[currentSlide].text}
                    </p>
                  </div>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 text-black bg-transparent focus:outline-none"
                  >
                    →
                  </button>
                  <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3">
                    {slides.map((_, index) => (
                      <span
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentSlide ? 'bg-teal-300' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div
                className="bg-white h-88 p-0 rounded-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-start rounded-md border-2 border-solid border-black p-5 pl-4 relative h-8 mb-4">
                    <img className="w-6 mr-2" src={mobile} alt="Mobile" />
                    <p className="text-sm font-bold">Continue with phone</p>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100"
                    onClick={handleClick}
                  >
                    <img className="w-7 absolute left-2" src={google} alt="Google" />
                    <p className="text-sm text-gray-500">Continue with Google</p>
                  </div>
                  <div className="pt-5 flex flex-col items-center justify-center">
                    <p className="font-semibold text-sm">OR</p>
                    <p className="font-bold text-sm pt-3 underline underline-offset-4">
                      Login with Email
                    </p>
                  </div>
                  <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
                    <p className="text-xs">All your personal details are safe with us.</p>
                    <p className="text-xs pt-5 text-center">
                      If you continue, you are accepting{' '}
                      <span className="text-blue-600">OLX Terms and Conditions and Privacy Policy</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Login;