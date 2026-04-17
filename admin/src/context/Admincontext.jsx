import { createContext, useContext, useEffect, useState } from "react";
import { Authdatacontext } from "./Authcontext";
import axios from "axios";

export const admindatacontext = createContext();

const Admincontext = ({children}) => {
    let [admindata,setAdmindata] = useState({})
let {serverurl} = useContext(Authdatacontext)

const getadmin = async() => {
    try {
         let result = await axios.get(`${serverurl}/api/user/getcurrentadmin`,{withCredentials:true})
    setAdmindata(result.data)
    console.log(result.data)
    } catch (error) {
        setAdmindata(null)
        console.log(error)
    }
   
}
useEffect(()=>{
    getadmin();
},[])
const value = {
admindata,setAdmindata,getadmin
}
return(
    <div>
        <admindatacontext.Provider value={value}>
{children}
        </admindatacontext.Provider>
    </div>
)
}

export default Admincontext;