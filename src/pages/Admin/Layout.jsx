import React from 'react'
import { useNavigate,Outlet}from 'react-router-dom'
import SideBar from '../../components/Admin/SideBar';
const Layout = () => {
    const navigate = useNavigate();

    const logout = ()=>{
        navigate('/');
    }
  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src='logo.svg' alt='logo' className='w-32 sm:w-40 cursor-pointer'
        onClick={()=>navigate('/')}/>
        <button onClick={logout} className='text-sm px-8 py-2 bg-blue-700 text-white rounded-full cursor-pointer'>Logout</button>

    </div>

    <div className='flex h-[calc(100vh-70px)]'>
       <SideBar/>
        <Outlet/>
        
    </div>
      
    </>
  )
}

export default Layout
