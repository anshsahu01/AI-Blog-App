import jwt from 'jsonwebtoken'
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';


export const adminLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
            return res.json({
                success : false,
                message : "Invalid Login Credentials"

            })
        }


        const token = jwt.sign({email},process.env.JWT_SECRET);

        res.json({
            success : true,
            token
        })
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}

export const getAdminBlogs = async (req,res) => {
   try {
     const blogs = await Blog.find({}).sort({createdAt : -1});
     res.json({
         success : true,
         blogs
     })
   } catch (error) {

    res.json({
        success : true,
        message : error.message
    })
    
   }
}


export const getAdminComments = async (req,res) => {
    try {

        const comments = await Comment.find({}).populate("blog").sort({createdAt : -1});
        res.json({
            status : true,
            comments
        })
        
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}


export const getDashboard = async (req,res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt : -1}).limit(5);
        const blogs = await Blog.countDocuments();

        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished : false});
          

        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }
        res.json({
            success : true,
           dashboardData

        })
        
    } catch (error) {
        
        res.json({
            success : true,
            message : error.message
        })
    }
}




export const deleteCommentById = async (req,res) => {
    try {

        const {id} = req.body;

        await Comment.findByIdAndDelete(id);
        res.json({
            success : true,
            message : "Comment Deleted Successfully"
        })
        
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}



export const approveCommentById = async (req,res) => {
    try {

        const {id} = req.body;
        await Comment.findByIdAndUpdate(
            id,
            {
                isApproved : true
            }
        )

        res.json({
            success : true,
            message : "Comment Approved Successfully"
        })
        
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}






