import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import close from '../../../assets/close.svg';
import fileUpload from '../../../assets/fileUpload.svg'; // Adjust path if different
import loading from '../../../assets/loading.gif'; // Adjust path if different
import EditInput from '../../Input/EditInput'; // Adjust path to your Input component

const EditModal = ({
  toggleModalEdit,
  status,
  product,
  setProduct,
  handleEditSubmit,
  handleImageUpload,
  image,
  setImage,
  submitting,
}) => {
  return (
    <Transition appear show={status} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={toggleModalEdit}
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
            <div className="fixed inset-0" />
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
                onClick={() => {
                  toggleModalEdit();
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
                  <p className="font-bold text-lg mb-3">Edit Product</p>

                  <form onSubmit={handleEditSubmit}>
                    <EditInput
                      setInput={(value) => setProduct({ ...product, title: value })}
                      placeholder="Title"
                      value={product.title || ''}
                    />
                    <EditInput
                      setInput={(value) => setProduct({ ...product, category: value })}
                      placeholder="Category"
                      value={product.category || ''}
                    />
                    <EditInput
                      setInput={(value) => setProduct({ ...product, price: value })}
                      placeholder="Price"
                      value={product.price || ''}
                    />
                    <EditInput
                      setInput={(value) => setProduct({ ...product, description: value })}
                      placeholder="Description"
                      value={product.description || ''}
                    />

                   <div className="pt-2 w-full relative">
  {image || product.imageUrl ? (
    <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
      <img
        className="object-contain"
        src={image ? URL.createObjectURL(image) : product.imageUrl}
        alt=""
      />
      {/* Overlay file input to allow image replacement */}
      <input
        onChange={handleImageUpload}
        type="file"
        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
        // Not required if an image already exists
        required={!image && !product.imageUrl}
      />
    </div>
  ) : (
    <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
      <input
        onChange={handleImageUpload}
        type="file"
        className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30"
        required={!product.imageUrl}
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
                          Update Product
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
  );
};

export default EditModal;