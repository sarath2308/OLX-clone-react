import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/Auth.jsx'
import { ItemsContextProvider } from './Components/Context/Item.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <ItemsContextProvider>
       <AuthProvider>
        <BrowserRouter>
         <StrictMode>
    <App />
  </StrictMode>
        </BrowserRouter>
      
   </AuthProvider>
    </ItemsContextProvider>
 
  
)
