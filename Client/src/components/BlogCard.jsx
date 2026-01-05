import React from 'react'
import {useNavigate} from 'react-router-dom'
// import { blogs } from '../main'

const BlogCard = ({blog}) => {
    const {title, description, category, thumbnail, _id} = blog;
    const navigate = useNavigate();
  return (
    <>
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-blue-700 duration-300 cursor-pointer'>
        <img
          src={thumbnail}
          alt={title}
          className='aspect-video object-cover'
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Available';
          }}
        />
        <span className='ml-5 mt-4 py-1 inline-block bg-blue-500 text-white rounded-full text-xs'>
            {category}
            </span> 

            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'>
                    {title}
                    {/* <p className='mb-3 text-xs text-gray-600'>{description} </p> */}
                    </h5>
            </div> 
      
    </div>


    </>

  )
}

export default BlogCard
