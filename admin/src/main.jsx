import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import App from './App.jsx'
import Authcontext from './context/Authcontext.jsx'
import Admincontext from './context/Admincontext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Authcontext>
  <Admincontext>
    <App />
    </Admincontext>
    </Authcontext>
  </BrowserRouter>
)
