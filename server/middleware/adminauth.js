import jwt from "jsonwebtoken"
const adminauth = (req,res,next) => {
try {
    const {token} = req.cookies
    if(!token){
        return res.status(400).json({message:"admin does not have token"})
    }
        const verifytoken = jwt.verify(token, process.env.JWT_KEY)
        if(!verifytoken){
            return res.status(400).json({message:"admin does not have valid token"})
        }
    
    req.Adminemail = process.env.ADMIN_EMAIL
    next()
} catch (error) {
    console.log("error in token verify admin")
    return res.status(500).json({message:"admin does not have token"})
}
}

export default adminauth