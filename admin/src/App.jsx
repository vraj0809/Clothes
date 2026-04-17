
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Addp from './pages/Addp'
import Home from './pages/Home'
import List from './pages/List'
import Login from './pages/Login'
import Order from './pages/Order'
import { useContext } from 'react'
import { admindatacontext } from './context/Admincontext'
import {ToastContainer,toast} from "react-toastify"
import Updateproduct from './pages/Updateproduct'

function App() {
const {admindata} = useContext(admindatacontext)  

  return (
    <>
    <ToastContainer/>
    {!admindata ? <Login/> :
      <div className="admin-layout">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/addp" element={<Addp/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
          <Route path="/list" element={<List/>}></Route>
          <Route path="/updateproduct/:id" element={<Updateproduct/>}></Route>
        </Routes>
      </div>
    }
    </>
  )
}

export default App
