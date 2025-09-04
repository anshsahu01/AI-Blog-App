import mongoose from "mongoose";
import { User } from "./user.model.js";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    subTitle : {
        type : String,
       
    },

    description: {
        type : String,
        required : true,
    },

    category: {
        type : String,
        required : true,
    },

    thumbnail : {
        type : String,
        required : true,
    },

    isPublished : {
        type : Boolean,
        required : true,
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,// ye reference to user hai
        ref : "User",
        required : true
    },

    views : {
        type : Number,
        default : 0
    }


}, {timestamps : true} );

const Blog = mongoose.model('blog', blogSchema);

export default Blog;