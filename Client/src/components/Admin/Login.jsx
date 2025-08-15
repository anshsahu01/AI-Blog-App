// import React, { useState } from 'react'
// import { useAppContext } from '../../context/appContext';
// import toast from 'react-hot-toast';

// const Login = () => {

//   const {axios, setToken, navigate} = useAppContext();

// const [email,setEmail] =  useState('');
// const [password, setPassword] = useState('');

//   const handleSumbit =async (e)=>{
//     e.preventDefault(); // stop page reload
//     try {
//         const {data} = await axios.post('/api/admin/login', {email,password});
//         if(!data){
//           console.log("Data nhi mil rha hai");
//         }
//         console.log(data);
        
//         if(data.success){
//           console.log("data.success a rha hai",data.success)
//           setToken(data.token);
//           localStorage.setItem('token',data.token);
//           axios.defaults.headers.common['Authorizaion'] = data.token;
         
//         }else{
//            toast.error(error.message);
//         }
//     } catch (error) {

//       toast.error(error.message);
      
//     }

//   }
//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <div className='w-full max-w-sm p-6 max-md:m-6 border shadow-xl rounded-lg'>
//         <div className='flex flex-col items-center justify-center'>
//            <div className='w-full py-6 text-center'>
//             <h1 className='text-3xl font-bold'><span className='text-blue-700'>Admin</span> Login</h1>
//             <p className='font-light'>Enter your credentials to access the admin panel</p>
//            </div>
//            <form onSubmit={handleSumbit} className='mt-6 w-full sm:max-w-md text-gray-600'>
//             <div className='flex flex-col'>
//               <label>Email</label>
//               <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' required placeholder='Enter Email' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
//             </div>

//               <div className='flex flex-col'>
//               <label>Password</label>
//               <input type='password' onChange={(e)=>setPassword(e.target.value)} value={password} required placeholder='Enter Password' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
//             </div>
//             <button type='submit' className='w-full py-3 bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-700/90'>Login</button>
//            </form>

//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { axios, setToken, navigate } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (!data) {
        toast.error("No response from server");
        return;
      }

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        toast.success("Login successful!");
        navigate('/admin'); // change path as needed
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border shadow-xl rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-700">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 w-full sm:max-w-md text-gray-600">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Enter Email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Enter Password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-700/90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

