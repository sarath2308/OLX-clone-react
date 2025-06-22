// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore"; 

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