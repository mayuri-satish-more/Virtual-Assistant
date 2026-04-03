import express from "express"
import {signUp, logOut, login} from "../controllers/auth.controllers.js"



const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",login)
authRouter.post("/logout",logOut)
export default authRouter

