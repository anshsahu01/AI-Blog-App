import express from 'express'

import { registerUser, loginUser, logoutUser, followUser, unfollowUser, fetchFollowers, fetchFollowing } from '../controllers/user.controller.js'

import auth from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout",auth,logoutUser);

// api for follow unfollow and fetch followers

userRouter.post("/follow",followUser);
userRouter.post("/unfollow",unfollowUser);
userRouter.get("/:id/followers", fetchFollowers);
userRouter.get("/:id/following",fetchFollowing)

export default userRouter;