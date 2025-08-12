
import imageKit from "../Configs/imagekit";
import fs from 'fs'
import Blog from "../models/blog.model.js";

export const addBlog = async (req,res)=>{
    try {
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file; // ye multer se milega
        if(!title || !description || !category || !imageFile){
            return res.json({
                success : false,
                message : "Missing Required Field",
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
          // NOW UPLOAD THE IMAGE ON IMAGE KIT
        const response = await imageKit.upload({
            file : fileBuffer,
        fileName : imageFile.originalname,
        
        })

        // Now optimise the image

        const optimizedImageUrl = imageKit.url({
            path : response.filePath,
            transformation : [
                {quality : 'auto'}, // auto compression
                { format : 'webp'}, // for changing the format
                { width : '1280px'},
            ]
          
        });

        const image = optimizedImageUrl;

        // now create the blog with the help of the model
        
await Blog.create({
    title,
    subTitle,
    description,
    category,
    image,
    isPublished
})


res.json({
    success : true,
    message : " Blog Added Successfully"
})
            
        
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}