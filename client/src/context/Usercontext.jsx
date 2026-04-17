/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react"
import { authDataContext as AuthDataContext, userDatacontext as UserDataContext } from "./contexts"
import axios from "axios"


const Usercontext = ({children}) => {
    const [user,setUser] = useState()
    const {serverurl} = useContext(AuthDataContext)
    const getcurrentuser = async() => {
        try {
           const result = await axios.get(`${serverurl}/api/user/getcurrentuser`,{withCredentials:true})
            setUser(result.data)
            console.log(result.data)    
            return result.data
        } catch (error) {
            console.log(error, "in usercurrent")
            setUser(null)
            return null
        }
    }
    useEffect(()=>{
        getcurrentuser();
    },[])
     const value = {
        user,setUser,getcurrentuser
    }
    return(
        <>
    <UserDataContext.Provider value={value}>
        {children}
    </UserDataContext.Provider>
        </>
    )
}

export default Usercontext;