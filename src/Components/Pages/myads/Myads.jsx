// pages/MyAds.jsx
import React, { useEffect, useState } from 'react';
import { ItemsContext } from '../../Context/Item';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteProductById, fetchFromFireStore, updateProductById } from '../../firebase/firebase';
import { Navbar } from '../../Navbar/Navbar';
import Login from '../../Modal/Login/Login';
import Sell from '../../Modal/Sell/Sell';
import ProductCard from '../../cards/MyadsCard';
import EditModal from '../../Modal/EditProduct/EditModal';
import { userAuth } from '../../Context/Auth';
  import { ToastContainer, toast } from 'react-toastify';

const MyAds = () => {
    //context
  const { items, setItems } = ItemsContext();
 const auth=userAuth()
  //hooks

  const [myAds, setMyAds] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [editModal,setEditModal]=useState(false)
  const [product,setProduct]=useState()
  const [removeItem,setRemoveItem]=useState()

  //from data

    const [submitting,setSubmiting]=useState(false)
   const [image,setImage]=useState(null)

  //toggle part
  const toggleModal = () => setOpenModal(!openModal);
  const toggleModalSell = () => setOpenSellModal(!openSellModal);
  const toggleModalEdit=()=>
  {
    setEditModal(!editModal)
  }
const handleImageUpload=(event)=>
{
  if(event.target.files)
  {
    setImage(event.target.files[0])
  }
}

 const handleEditSubmit=async(e)=>
  {
    console.log(product);
    
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
        toast.error('failed to read image')
        return;
      }
    }


    try {
      if (imageUrl) {
  product.imageUrl = imageUrl;
}

       const result= await updateProductById(product.id,product)
        setImage(null)
        const datas=await fetchFromFireStore();
        setItems(datas)
        toggleModalEdit();
    } catch (error) {
        console.log("error"+error);
        
    }finally{
        setSubmiting(false)
    }
  }

  //edit
  const onEdit=(product)=>
  {
    setProduct(product)
   setEditModal(!editModal)
  }
 

  //Remove
 const onRemove = async (productId) => {
  try {
    await deleteProductById(productId);
    const updatedItems = await fetchFromFireStore();
    setItems(updatedItems);
    toast.success("Ad removed successfully.");
  } catch (error) {
    console.error("Failed to delete:", error);
  }
};

  useEffect(() => {
  if (auth.user && items) {
    const filtered = items.filter((item) => item.userId === auth.user.uid);
    setMyAds(filtered);
  }
}, [items, auth.user, removeItem]);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleModal={toggleModal} sellModal={toggleModalSell} status={openModal} />
      <Login toggleModal={toggleModal} isOpen={openModal} />
      {openSellModal && (
        <Sell toggleModalSell={toggleModalSell} status={openSellModal} setItems={setItems} />
      )}

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Ads</h1>

        {myAds.length === 0 ? (
          <p className="text-gray-600">You haven't posted any ads yet.</p>
        ) : (
          <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
            {myAds.map((ad) => (
              <ProductCard key={ad.id} product={ad} onEdit={onEdit} onRemove={onRemove} />
            ))}
          </div>
        )}
      </div>
      {editModal &&
      <EditModal toggleModalEdit={toggleModalEdit}
      status={editModal} 
      product={product} 
      setProduct={setProduct} 
      handleEditSubmit={handleEditSubmit}
       handleImageUpload={handleImageUpload}
       image={image}
       setImage={setImage}
       submitting={submitting}
       />
      }
    </div>
  );
};

export default MyAds;
