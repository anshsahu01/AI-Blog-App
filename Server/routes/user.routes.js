import express from 'express'

import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js'

import auth from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout",auth,logoutUser);

export default userRouter;