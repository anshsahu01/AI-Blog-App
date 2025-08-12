import React from 'react'

const CommenTable = ({comment, fetchComments}) => {
    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);
  return (
   <tr className='order-y border-gray-300'>
    <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
        <br/>
        <br/>
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br/>
        <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
    </td>
    <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleString()}
    </td>
    <td className='px-6 py-4 flex'>
        <div className='flex items-center gap-4'>{!comment.isApproved?
        <img src='/tick_icon.svg' alt='tickicon' className='w-5 hover:scale-110 transition-all cursor-pointer'/> : <p className='text-xs border border-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
        <img src='/bin_icon.svg' alt='bin-icon' className='w-5 hover:scale-110 transition-all cursor-pointer'/>
        </div>
    </td>
   </tr>
  )
}

export default CommenTable
