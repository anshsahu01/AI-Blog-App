

import imageKit from "../Configs/imagekit.js";
import fs from 'fs'
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import main from "../Configs/gemini.js";
import { generatePollinationUrl } from "../Configs/pollination.js";

// export const addBlog = async (req, res) => {
//     try {
//         // Add extensive debugging
//         console.log('=== DEBUGGING BLOG CREATION ===');
//         console.log('req.body:', req.body);
//         console.log('req.file:', req.file);
//         console.log('req.files:', req.files);

//         // Check if req.body.blog exists
//         if (!req.body.blog) {
//             return res.json({
//                 success: false,
//                 message: "Blog data not found in request body"
//             });
//         }

//         const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
//         // console.log('Parsed blog data:', { title, subTitle, description, category, isPublished });

//         const imageFile = req.file;
//         if(!imageFile){
//              console.log("Image file nhi mil rhi");
//             return res.json({
//                 success : false,
//                 message : "Image file is required",
//             })
//         }
//         console.log('Image file details:', imageFile);

//         // Check all required fields
//         if (!title || !description || !category) {
//             return res.json({
//                 success: false,
//                 message: "Missing required fields: title, description, or category"
//             });
//         }

//   //upload image directly from buffer
//   const res = await imageKit.upload({
//     file : imageFile.buffer,
//     fileName : Date.now() + "-" + imageFile.originalname,
//   })

//   console.log("Image kit upload response",res);

//         // console.log('Reading file from path:', imageFile.path);
//         // const fileBuffer = fs.readFileSync(imageFile.path);
//         // console.log('File buffer created, size:', fileBuffer.length);

//         // // Upload to ImageKit
//         // console.log('Uploading to ImageKit...');
//         // const response = await imageKit.upload({
//         //     file: fileBuffer,
//         //     fileName: imageFile.originalname,
//         // });
//         // console.log('ImageKit upload response:', response);

//         // Optimize the image
//         const optimizedImageUrl = imageKit.url({
//             path: res.filePath,
//             transformation: [
//                 { quality: 'auto' },
//                 { format: 'webp' },
//                 { width: '1280px' },
//             ]
//         });
//         console.log('Optimized image URL:', optimizedImageUrl);
//                const thumbnail = optimizedImageUrl;
//         // Prepare blog data for creation
//         const blogData = {
//             title,
//             subTitle,
//             description,
//             category,
//             thumbnail,
//             isPublished: isPublished || false
//         };
        
//         console.log('Blog data to be saved:', blogData);
//         console.log('Thumbnail value specifically:', blogData.thumbnail);

//         // Create the blog
//         const newBlog = await Blog.create(blogData);
//         console.log('Blog created successfully:', newBlog);

//         // Clean up the uploaded file
//         // fs.unlinkSync(imageFile.path);

//         res.json({
//             success: true,
//             message: "Blog Added Successfully",
//             blog: newBlog
//         });

//     } catch (error) {
//         console.error('=== ERROR IN ADDBLOG ===');
//         console.error('Error type:', error.constructor.name);
//         console.error('Error message:', error.message);
//         console.error('Full error:', error);
        
//         // If it's a validation error, log the specific details
//         if (error.name === 'ValidationError') {
//             console.error('Validation errors:', error.errors);
//         }

//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// funtion to get all blogs


export const addBlog = async (req, res) => {
  try {
    console.log("=== DEBUGGING BLOG CREATION ===");
    console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    if (!req.body.blog) {
      return res.json({
        success: false,
        message: "Blog data not found in request body",
      });
    }

    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
      

       if (!title || !description || !category) {
      return res.json({
        success: false,
        message: "Missing required fields: title, description, or category",
      });
    }


    let finalImageUrl = null;
    if(req.file){
       const uploadResponse =  await imageKit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
    });
       
    finalImageUrl = imageKit.url({
        path: uploadResponse.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    

    }else if(req.body.thumbnail){
      console.log("Thumbnail",req.body.thumbnail);
      finalImageUrl = req.body.thumbnail;
    }else{
      return res.json({
        success : false,
        message : "Either upload an image or an AI generated image"
      })
    }

    
 

    

    const blogData = {
      title,
      subTitle,
      description,
      category,
      thumbnail: finalImageUrl,
      isPublished: isPublished || false,
    };

    const newBlog = await Blog.create(blogData);
    console.log("Blog created successfully:", newBlog);

    return res.json({
      success: true,
      message: "Blog Added Successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("=== ERROR IN ADDBLOG ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);

    if (error.name === "ValidationError") {
      console.error("Validation errors:", error.errors);
    }

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req,res) => {
  try {

    const blogs = await Blog.find(
        { isPublished : true } // jis bhi blog mein isPublished true hai wo send kar do
    )

    res.json(
        {
            success : true,
            blogs
        }
    )
    
  } catch (error) {

    res.json({
        success : false,
        message : error.message
    })
    
  }  
}

// function to get individual blog

export const getBlogById = async (req, res) => {
    try {

        const { blogId } = req.params;
        const blog = await Blog.findById( blogId );
        if( !blog ){
            return res.json( {
                status : false,
                message : "Blog not found"
            } )
        }

        res.json({
            success : true,
            blog
        })
        
    } catch (error) {

        return res.json({
            status : false,
            message : error.message
        })
        
    }
}

// function to delete blog

export const deleteBlogById = async (req,res) => {
    try {
        
        const { id } = req.body;

        await Blog.findByIdAndDelete(id);

        // after deleting the blog also delete the comments associated with it
        await Comment.deleteMany({
            blog : id
        })

        res.json({
            success : true,
            message : "Blog deleted successfully"
        })
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}

// to publish

export const togglePublish = async (req,res) => {
     try {

        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({
            success : true,
            message : "Status Changed"
        })
        
     } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
     }
}



// controller for comment

export const addComment = async (req,res) => {
    try {

        const {blog, name, content} = req.body;
          await Comment.create({
            blog,
            name,
            content
          })

          res.json({
            success : true,
            message : "Comment Added for review"
          })
        
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })

    }
}


// function to get blog comments

export const getBlogComments = async (req,res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({
            blog : blogId,
            isApproved : true
        }).sort({
            createdAt : -1
        })

        res.json({
            success : true,
            comments
        })
    } catch (error) {

        res.json({
            success : false,
            message : error.message
        })
        
    }
}


export const generateContentAI = async (req,res) => {
    try {
        const {prompt} = req.body;
         const content =  await main(prompt + 'Generate a blog content for this prompt in simple format');
         
         res.json({
            success : true,
            content
         })
        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        })
        
    }
}


// Controller for Pollination ai related operations

export const generateImage = async (req,res) => {
    try {

        const {title} = req.body;
        if(title){
            console.log(title);
        }

        if(!title){
            return res.json({
                success : false,
                message : "Title is required to generate image"
            })
        }
    

            const width = 512;
    const height = 512;
    // const seed = Math.floor(Math.random() * 1000000);;
    const model = "flux";
    const prompt = `Generate image for this title of my blog post - "${title}"`; //title will be taken as the prompt

        const images = [1,2,3,4].map((i)=>(
            generatePollinationUrl(
        prompt,
        width,
        height,
        Math.floor(Math.random() * 1000000), // random seed each time
        model
      )
        ))

        
        return res.json({
            success : true,
            images
        })


        
    } catch (error) {

        console.log("-----ERROR IN GENERATIG IMAGE-----",error.message);
        return res.json({
            success : false,
            message : error.message
        })
        
    }
}