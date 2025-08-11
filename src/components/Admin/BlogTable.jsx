import React from 'react'

function BlogTable({blog, fetchBlogs,index}) {
   const {title, createdAt} = blog;
   const BlogDate = new Date(createdAt);
    return (
<tr className='border-y border-gray-300'>
    <th className='px-2 py-4'>{index}</th>
     <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleString()}</td>
       <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished?"text-green-600":"text-orange-700"}`}>{blog.isPublished?'Published':'Unpusblished'}</p>
       </td>
       <td className='flex px-2 py-4 text-xs gap-3'>
        <button className='border px-2 py-0.5 mt-1 ronded cursor-pointer'>{blog.isPublished?'Unpublish':'Publish'}</button>
        <img src='cross_icon.svg' alt='crossicon' className='ml-2  hover:scale-110 transition-all cursor-pointer' />
       </td>
</tr>
  )
}

export default BlogTable
