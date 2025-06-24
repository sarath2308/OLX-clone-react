// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore,doc,updateDoc,deleteDoc } from "firebase/firestore"; 
import { signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmXnL3_t0OSR8JciZK3izq8UHbI0sM6R0",
  authDomain: "olx-clone-f40be.firebaseapp.com",
  projectId: "olx-clone-f40be",
  storageBucket: "olx-clone-f40be.firebasestorage.app",
  messagingSenderId: "774178013532",
  appId: "1:774178013532:web:ba026eef193a53196f8199"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider= new GoogleAuthProvider();
export const storage=getStorage();
export const fireStore=getFirestore();

export const fetchFromFireStore=async()=>
{
  try {
    const productsCollection=collection(fireStore,'products')
    const productSnapshot=await getDocs(productsCollection)
    const productList=productSnapshot.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }))
    console.log('fetched products from FireStore',productList);
    return productList;
    
  } catch (error) {
    console.log("error in fecting product from firestore"+error);
    return []
  }
}

export const updateProductById = async (id, updatedData) => {
  try {
    const productRef = doc(fireStore, 'products', id);
    await updateDoc(productRef, updatedData);
    console.log(`Product with ID ${id} updated successfully.`);
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

export const deleteProductById = async (productId) => {
  try {
    const productRef = doc(fireStore, 'products', productId); // 'products' is your collection name
    await deleteDoc(productRef);
    console.log('Document deleted successfully!');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error during sign out:', error.message);
    return { success: false, error: error.message };
  }
};