import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext';
import { useEffect } from 'react';

function BlogTable({blog, fetchBlogs,index}) {
  const {token} = useAppContext();
   const {title, createdAt} = blog;
   const BlogDate = new Date(createdAt);

   const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if(!confirm) return;

    try {
      const res = await axios.post('/api/blog/delete', {id : blog._id},{
        headers : {
          Authorization : token
        }
      });
      if(res){
        console.log("-----res----",res);
      }
      const data = res.data;
      if(data){
        console.log("-----data----",data);
      }

      if(data.success){
        toast.success(data.message);
        await fetchBlogs();
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {

      toast.error(error.message);
      
    }
   }

   const togglePublish = async () => {
    try {
      const res = await axios.post("/api/blog/toggle-publish",
        {id : blog._id},
         {
        headers : {
          Authorization : token
        }
      } 
    );

    const data = res.data;
    if(data.success){
     
      toast.success(data.message);
      await fetchBlogs();
      
    }else{
      toast.error(data.message);
    }
      
    } catch (error) {
      toast.error(error.message);
      
    }


   }


   
    return (
<tr className='border-y border-gray-300'>
    <th className='px-2 py-4'>{index}</th>
     <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleString()}</td>
       <td className='px-2 py-4 max-sm:hidden'>
        <p  className={`${blog.isPublished?"text-green-600":"text-orange-700"}`}>{blog.isPublished?'Published':'Unpusblished'}</p>
       </td>
       <td className='flex px-2 py-4 text-xs gap-3'>
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished?'Unpublish':'Publish'}</button>
        <img src='/cross_icon.svg' alt='crossicon' className='ml-2  hover:scale-110 transition-all cursor-pointer' onClick={deleteBlog} />
       </td>
</tr>
  )
}

export default BlogTable
