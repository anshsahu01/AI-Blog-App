import React from 'react'

import { useAppContext } from '../context/appContext';

const Navbar = () => {



    const {navigate, token} = useAppContext();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>

      <img onClick={()=>navigate('/')} src='logo.svg' alt='logoimag' className='w-32 sm:w-44 cursor-pointer'/>
      <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 bg-blue-700 rounded-full text-sm cursor-pointer text-white px-10 py-2.5'>
        {token ? 'Dashboard' : 'Login'}
        <img onClick={()=>navigate('/')} src='arrow.svg' alt='loginimg' className='w-3 bg-blue-700 cursor-pointer'/>
      </button>
    </div>
  )
}

export default Navbar
