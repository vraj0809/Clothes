import { createContext } from "react";
 export const Authdatacontext = createContext();
const Authcontext = ({children}) => {
   let serverurl = "https://clothes-8gzj.vercel.app"
   let value = {
    serverurl
   }
return(
   <div>
    <Authdatacontext.Provider value={value}>{children}</Authdatacontext.Provider>
   </div>
)
}

export default Authcontext;
