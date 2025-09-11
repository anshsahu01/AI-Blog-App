import mongoose from "mongoose";
import { User } from "./user.model.js";
import Blog from "./blog.model.js";


const clapSchema = new mongoose.Schema({
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog",
        required : true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    claps : {
        type : Number,
        default : 0
    }



}, { timestamps : true});



clapSchema.index({ blogId : 1, userId : 1}) // isse ye hoga ki ek user ka ek blog per hi like hoga

export const Clap = mongoose.model('clap', clapSchema);