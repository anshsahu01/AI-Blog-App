import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from './pages/Admin/Layout.jsx'
import Dashboard from './pages/Admin/Dashboard'
import AddBlog from './pages/Admin/AddBlog'
import Comments from './pages/Admin/Comments'
import Login from './components/Admin/Login.jsx'
import ListBlog from './pages/Admin/ListBlog'
import FollowList from './components/Admin/followList.jsx'
import FollowingList from './components/Admin/followingList.jsx'
// Page Import 
import Blog from './pages/Blog'
import Home from './pages/Home'
import SignUpPage from './pages/SignUp.jsx'



// other imports
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/appContext'
import followingList from './components/Admin/followingList.jsx'

const App = () => {

  const {token} = useAppContext();
  return (
    <div>
        <Toaster/>{/*   // with this you can use toast notifications */}

      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/blog/:id" element = {<Blog/>}/>

       {/* making the parent route admin and child routes */}
       <Route path="/signup" element={<SignUpPage/>}/>
       <Route path="/login" element={<Login/>}/>

       <Route path='/admin' element={token?<Layout/>:<Login/>}>
         {/* index means ye default route hai admin per jaane per ye hi dikhega */}
         <Route index element={<Dashboard/>}/>
         <Route path='addBlog' element={<AddBlog/>}/>
         <Route path='comments' element={<Comments/>}/>
         <Route path='listblog' element={<ListBlog/>}/>
         <Route path="followers" element={<FollowList/>}/>
         <Route path="following" element={<FollowingList/>}/>


       </Route>
      </Routes>
      
    </div>
  )
}

export default App
