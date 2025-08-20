import express from 'express'

import { registerUser } from '../controllers/user.controller.js'

import auth from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post("/register",registerUser);

export default userRouter;