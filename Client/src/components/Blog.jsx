// import React, { useEffect,useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Moment from 'moment'
// import { useAppContext } from '../context/appContext';
// import toast from 'react-hot-toast';

// function Blog() {
//     const {id} =  useParams(); // id se jo bhi data aayega vo use params se lenge

//     const {axios} = useAppContext();

//     const [data,setData] = useState(null);
//      const [comments, setComments] = useState([]);

//     const fetchBlogData =  async ()=>{
//        try {

//         const {data} = await axios.get(`/api/blog/${id}`)
//         data.success ? setData(data.blog) : toast.error(data.message)

        
//        } catch (error) {
//         toast.error(error.message);
        
//        }
//     }

//     const fetchComments = async ()=>{
//         try {

//             const {data} = await axios.post('/api/blog/comments',{blogId : id});

//            if( data.success ){
//             setComments( data.comments);
//            }else{
//             toast.error( data.message);
//            }
            
//         } catch (error) {
//             toast.error( error.message );
            
//         }
//     }


//     useEffect(()=>{
//         fetchBlogData();
//         fetchComments();
//     },[])
//   return data? (
//     <div className='relative'>
//         <img src='gradientBackground.png' alt='gradient' className='absolute -top-50 -z-1 opacity-50'/>
//         <div className='text-center mt-20 text-gray-600'>
//             {/* <p className='py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p> */}
//             <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
//             <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subtitle}</h2>
//             <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm bg-blue-700/5 font-medium '></p>
//         </div>
//         <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
//             <img src={data.image} alt="" className='ronded-3xl mb-5'/>
//         </div>

//         <div className='mt-14 mb-10 max-w-3xl mx-auto'>
//        <p className='font-semibold mb-4'> Comments ({comments.length})</p>
//        <div className='flex flex-col gap-4'>
//         {comments.map((item,idx)=>(
//             <div key={idx} className='relative bg-blue-700/2 border max-w-xl p-4 rounded text-gray-600'>
//                 <div className='flex items-center gap-2 mb-2'>
//                     <img src='user_icon.svg' alt='usericon'/>
//                     <p className='font-medium'>{item.name}</p>
//                 </div>
//             <p className='text-sm max-w-md ml-8'>{item.content}</p>
//             <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()} </div>
//             </div>
//         ))}
//        </div>
//   {/* add comment section */}
//        <div className='max-w-3xl mx-auto'>
//         <p className='font-semibold mb-4'>Add your comment</p>
//         <form className='flex flex-col items-start gap-4 max-w-lg'>
//             <input type='text' placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none'/>
//             <button type='submit' className='bg-blue-700 text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
//         </form>

        
//         </div>
    
//     </div>
//   ):<div>Loading...</div>
// }

// export default Blog


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";

function Blog() {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Fetch blog details
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      res.data.success
        ? setData(res.data.blog)
        : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const {data} = await axios.post("/api/blog/comments", { blog: id });
      if(data){
        console.log(data);
      }
     
      data.success
        ? setComments(data.comments)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Submit new comment
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const {data}= await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content: comment,
      });
      if (data.success) {
        // setComments((prev) => [res.data.comment, ...prev]);
        setName("");
        setComment("");
        toast.success("Comment added for review!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      <img
        src="gradientBackground.png"
        alt="gradient"
        className="absolute -top-50 -z-1 opacity-50"
      />

      {/* Blog Title & Details */}
      <div className="text-center mt-20 text-gray-600">
        <p className="py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subtitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm bg-blue-700/5 font-medium">
          {data.category}
        </p>
      </div>

      {/* Blog Image */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="rounded-3xl mb-5 w-full"
        />
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

      {/* Comments */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-semibold mb-4">
          Comments ({comments.length})
        </p>
        <div className="flex flex-col gap-4 mb-8">
          {comments.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-blue-700/2 border max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="user_icon.svg" alt="usericon" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            className="flex flex-col items-start gap-4 max-w-lg"
            onSubmit={submitComment}
          >
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Your comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none resize-none"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-700 text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-500">Loading...</div>
  );
}

export default Blog;

