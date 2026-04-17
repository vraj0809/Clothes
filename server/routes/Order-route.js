import express from "express"
import { adminallorder, orderfilterforadmin, Placeorder, placeorderRazorpay, updatestatus, userorder, verifyrazorpay } from "../controller/ordercontroller.js"
import isauth from "../middleware/isauthmid.js"
import adminauth from "../middleware/adminauth.js"
const orderroute = express.Router()

orderroute.post("/placeorder", isauth, Placeorder)
orderroute.post("/placeorderbyrazorpay", isauth, placeorderRazorpay)
orderroute.post("/verifyrazorpay", isauth, verifyrazorpay)
orderroute.get("/userorders", isauth, userorder)

orderroute.get("/allorders", adminauth, adminallorder)
orderroute.patch("/updatestatus", adminauth, updatestatus)
orderroute.get("/orderfilterforadmin", adminauth, orderfilterforadmin)
export default orderroute