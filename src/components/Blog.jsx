import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Moment from 'moment'

function Blog() {
    const {id} =  useParams(); // id se jo bhi data aayega vo use params se lenge
    const [data,setData] = useState(null);
     const [comments, setComments] = useState([]);

    const fetchBlogData =  async ()=>{
        const data = blog_data.find(item._id===id);
        setData(data);
    }

    const fetchComments = async ()=>{
        setComments(comments_data);
    }


    useEffect(()=>{
        fetchBlogData();
        fetchComments();
    },[])
  return data? (
    <div className='relative'>
        <img src='gradientBackground.png' alt='gradient' className='absolute -top-50 -z-1 opacity-50'/>
        <div className='text-center mt-20 text-gray-600'>
            {/* <p className='py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p> */}
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
            <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subtitle}</h2>
            <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm bg-blue-700/5 font-medium '></p>
        </div>
        <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
            <img src={data.image} alt="" className='ronded-3xl mb-5'/>
        </div>

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
       <p className='font-semibold mb-4'> Comments ({comments.length})</p>
       <div className='flex flex-col gap-4'>
        {comments.map((item,idx)=>(
            <div key={idx} className='relative bg-blue-700/2 border max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                    <img src='user_icon.svg' alt='usericon'/>
                    <p className='font-medium'>{item.name}</p>
                </div>
            <p className='text-sm max-w-md ml-8'>{item.content}</p>
            <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()} </div>
            </div>
        ))}
       </div>
  {/* add comment section */}
       <div></div>
        </div>
    
    </div>
  ):<div>Loading...</div>
}

export default Blog
