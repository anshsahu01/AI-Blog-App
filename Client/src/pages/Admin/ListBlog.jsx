import React,{useState,useEffect} from 'react'
import BlogTable from '../../components/Admin/BlogTable'
import { blogs } from '../../main'
import { useAppContext } from '../../context/appContext'
import toast from 'react-hot-toast'
const ListBlog = () => {
      const [blog,setBlogData] =  useState([]);

      const {axios, token} = useAppContext();
      console.log(token);


    const fetchBlogs = async ()=>{
       try {
        

     

        const {data} = await axios.get('/api/admin/blogs',{
          headers : {
            Authorization : token
          }
        });
        
        if(data.success){
          setBlogData(data.blogs);
        }else{
          toast.error(data.message)
        }
        
        
       } catch (error) {
        toast.error(error.message);
        
       }
      }
    
      useEffect(()=>{
        fetchBlogs();
      },[blog])
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
                         <BlogTable key={item._id} blog={item} fetchBlogs={fetchBlogs} index={index+1}  />
              ))}

            </tbody>
          </table>
        </div>
  )
}

export default ListBlog
