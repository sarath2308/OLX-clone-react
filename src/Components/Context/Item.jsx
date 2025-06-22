import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useState ,useEffect} from "react";
import { fireStore } from "../firebase/firebase";
const Context=createContext(null)
export const ItemsContext=()=>useContext(Context)

export const ItemsContextProvider=({children})=>
{
    const [items,setItems]=useState([]);

    useEffect(()=>
    {
        const fetchItemsFromFireStore=async()=>
        {
           try {
            const productsCollection=collection(fireStore,'products');
            const productSnapshot=await getDocs(productsCollection)
            const productsList=productSnapshot.docs.map(doc=>
            ({
                id:doc.id,
                ...doc.data()
            }
            ))
            setItems(productsList)
            
           } catch (error) {
            console.log("error occured while fecthing products"+error);
            
           } 
        }
        fetchItemsFromFireStore();
    },[])
    return(
        <>
        <Context.Provider value={{items,setItems}}>
            {children}
        </Context.Provider>
        </>
    )
}