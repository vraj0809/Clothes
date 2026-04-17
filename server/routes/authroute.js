import express from "express";
import { Adminlogin, glogin, login, logout, mailhealth, register, resetotpgenerate, resetotpverify, otpgenerate, otpverify } from "../controller/authcontroller.js";
const authrouter = express.Router()

authrouter.post("/register", register)
authrouter.post("/login", login)
authrouter.get("/logout", logout)
authrouter.post("/glogin", glogin)
authrouter.post("/adminlogin", Adminlogin)
authrouter.post("/resetotpgenerate", resetotpgenerate)
authrouter.post("/resetotpverify", resetotpverify)
authrouter.post("/otpgenerate", otpgenerate)
authrouter.post("/otpverify", otpverify)
authrouter.get("/mail-health", mailhealth)
authrouter.get("/mainhealth", mailhealth)
export default authrouter;