import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const AuthContext=createContext(null)

export const userAuth=()=>useContext(AuthContext)

export const AuthProvider=({children})=>
{
    const [user,setUser]=useState(null)
    useEffect(()=>
    {
        const unsubscribe= onAuthStateChanged(auth,(currentUser)=>
        {
          setUser(currentUser)
        });
        return unsubscribe();
    },[])

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}