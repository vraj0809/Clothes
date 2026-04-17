import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/authcontext.jsx'
import Usercontext from './context/Usercontext.jsx'
import Shopcontext from './context/Shopcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
    <Usercontext>
      <Shopcontext>
    <App />
    </Shopcontext>
    </Usercontext>
    </AuthContext>
    </BrowserRouter>

)
