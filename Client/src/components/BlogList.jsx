import React,{useState} from 'react'
import {motion} from 'motion/react'
import { blogs } from '../main'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/appContext'


const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const {blogs,input} = useAppContext();
     const filteredBlogs = () => {
  const searchTerm = input.trim().toLowerCase();

  if (!searchTerm) return blogs;

  return blogs.filter(blog => {
    const title = blog.title?.toLowerCase() || "";
    const category = blog.category?.toLowerCase() || "";
    return title.includes(searchTerm) || category.includes(searchTerm);
  });
};

    const blogCategories = ['All', 'Technology', 'Startup', 'Lifestyle', 'Finance'];
  return (
    <div>
        <div className='flex justify-center gap-4 sm:gap-8 my-10 relative '>
            {blogCategories.map((item)=>(
                <div key={item} className='relative'>
                    <button onClick={()=>setMenu(item)} className={`cursor-pointer text-gray-500 ${menu=== item && 'text-white px-4 pt-0.5'}`}>
                        {item}
                        {menu===item && (  <motion.div 
                        layoutId='underline'
                        transition={{type:'spring', stiffness:500, damping:30}}
                        className='bg-blue-700 absolute left-0 right-0 top-0 h-7 -z-1 rounded-full'></motion.div>
) }
                   </button>
                </div>
            ))}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-40'>
            {filteredBlogs().filter((blog)=>menu === "All"?true : blog.category===menu)
            .map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}

        </div>
      
    </div>
  )
}

export default BlogList
