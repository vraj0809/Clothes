import jwt from "jsonwebtoken"
const isauth = (req,res,next) => {
try {
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message:"Unauthorized: token missing"})
    }
        const verifytoken = jwt.verify(token, process.env.JWT_KEY)
        if(!verifytoken){
            return res.status(401).json({message:"Unauthorized: invalid token"})
        }
    
    req.userId = verifytoken.userId
    next()
} catch (error) {
    console.log("error in token verify", error?.message)
    return res.status(401).json({message:"Unauthorized: token verification failed"})
}
}

export default isauth