import React, {useRef} from 'react'
import { useAppContext } from '../context/appContext'

const Header = () => {

  const {input, setInput} = useAppContext();
   const inputRef = useRef();

   const submitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);

   }
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-blue-700 rounded-full text-sm'> 
                <p>New AI feature integrated </p>
                <img src='star_icon.svg' className='w-2.5' alt='icon'/>
            </div>

            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-blue-700'>blogging</span> <br/> platform.</h1>
            <p className=' my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>This is your space to thing out loud, to share what matters, and to write without filters. Whether its one word or a thousand, your story starts right here</p>

            <form  onSubmit={submitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden px-4 '>
                <input ref={inputRef} className='w-full pl-4  outline-none'  type='text' placeholder='Search For Blogs' required/>
                <button className='bg-blue-700 text-white px-6 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer ' type='submit'>Search</button>
            </form>
        </div>
        <img src='gradientBackground.png' alt='headeimg' className='absolute -top-50 -z-1 opacity-50'/>
      
    </div>
  )
}

export default Header
