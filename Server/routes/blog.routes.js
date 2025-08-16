import express from 'express'
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments, generateContentAI } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();


blogRouter.post("/add-blog",upload.single('thumbnail'), auth, addBlog)
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById); // ismein auth middleware daala hai taki sirf admin hi blog delete kar sake
blogRouter.post("/toggle-publish",auth,togglePublish);


//route for comments

blogRouter.post("/add-comment",addComment);
blogRouter.post("/comments",getBlogComments);


//route for gemini ai
blogRouter.post("/generate",auth,generateContentAI);




export default blogRouter;