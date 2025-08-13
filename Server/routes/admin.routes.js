import express from 'express'
import { adminLogin,  getAdminBlogs, getAdminComments, getDashboard, deleteCommentById, approveCommentById  } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
const adminRouter =  express.Router();

adminRouter.post("/login",adminLogin)

adminRouter.get("/comments", auth, getAdminComments);
adminRouter.get("/blogs", auth, getAdminBlogs);
// adminRouter.post("/delete-comment", auth,deleteCommentById);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.get("/approve-comment", auth, approveCommentById)


export default adminRouter;