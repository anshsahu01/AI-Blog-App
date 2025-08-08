import React from 'react'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>

      <img onClick={()=>navigate('/')} src='logo.svg' alt='logoimag' className='w-32 sm:w-44 cursor-pointer'/>
      <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 bg-amber-500 rounded-full text-sm cursor-pointer text-white px-10 py-2.5'>Login
        <img onClick={()=>navigate('/')} src='arrow.svg' alt='loginimg' className='w-3 bg-amber-500 cursor-pointer'/>
      </button>
    </div>
  )
}

export default Navbar
