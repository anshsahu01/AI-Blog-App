import React,{useState,useEffect} from 'react'
import BlogTable from '../../components/Admin/BlogTable'
import { blogs } from '../../main'
const ListBlog = () => {
      const [blog,setBlogData] =  useState([]);
    const fetchBlogs = async ()=>{
        setBlogData(blogs)
      }
    
      useEffect(()=>{
        fetchBlogs();
      },[])
  return (
   <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className=" w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-2 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-2">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-2 max-sm:hidden">
                  Date
                </th>

                <th scope="col" className="px-2 py-2 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-2">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {blog.map((item,index)=>(
                         <BlogTable key={item._id} blog={item} fetchBlogs={fetchBlogs} index={Number(item._id)+1}  />
              ))}

            </tbody>
          </table>
        </div>
  )
}

export default ListBlog
