import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Nav from "./component/nav"
import { userDatacontext } from "./context/contexts"
import Collection from "./pages/Collection"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Product from "./pages/Product"
import Productdetail from "./pages/Productdetail";
import Cart from "./pages/Cart";
import Placeorder from "./pages/Placeorder";
import Order from "./pages/Order";
import NotFound from "./pages/Notfound";
import Ai from "./component/Ai";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(userDatacontext);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      toast.error("You have to login for access");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  return children;
};

function App() {
  
const {user} = useContext(userDatacontext)
let location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
   <Nav/>
   <ToastContainer
     position="bottom-right"
     autoClose={2200}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="dark"
   />
     <Routes>
      <Route
  path="/login"
  element={
    user ? (
      <Navigate to={location.state?.from || "/"} />
    ) : (
      <Login />
    )
  }
/>
      
       <Route
  path="/register"
  element={
    user ? (
      <Navigate to={location.state?.from || "/"} />
    ) : (
      <Register />
    )
  }
/>
       <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/collection" element={<Collection />} />
  <Route path="/product" element={<Product />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/productdetail/:id" element={<Productdetail />} />

  <Route
    path="/cart"
    element={
      <ProtectedRoute>
        <Cart/>
      </ProtectedRoute>
    }
  />
  <Route
    path="/placeorder"
    element={
      <ProtectedRoute>
        <Placeorder/>
      </ProtectedRoute>
    }
  />
  <Route
    path="/order"
    element={
      <ProtectedRoute>
        <Order/>
      </ProtectedRoute>
    }
  />
  <Route path="*" element={<NotFound/>}/>
   <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
     </Routes>
    
     <Ai></Ai>
    </>
  )
}

export default App
