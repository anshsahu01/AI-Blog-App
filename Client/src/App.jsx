import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard'
import AddBlog from './pages/Admin/AddBlog'
import Comments from './pages/Admin/Comments'
import Login from './components/Admin/Login'
import ListBlog from './pages/Admin/ListBlog'
// Page Import 
import Blog from './pages/Blog'
import Home from './pages/Home'


// other imports
import 'quill/dist/quill.snow.css'

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/blog/:id" element = {<Blog/>}/>
       
       // making the parent route admin and child routes in import PropTypes from 'prop-types'
       <Route path='/admin' element={true?<Layout/>:<Login/>}>
         <Route index element={<Dashboard/>}/> // index means ye default route hai admin per jaane per ye hi dikhega
         <Route path='addBlog' element={<AddBlog/>}/>
         <Route path='comments' element={<Comments/>}/>
         <Route path='listblog' element={<ListBlog/>}/>


       </Route>
      </Routes>
      
    </div>
  )
}

export default App
