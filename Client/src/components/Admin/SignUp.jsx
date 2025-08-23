

import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const SignUp = () => {
  const { axios, setToken, navigate } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    try {
      if(password != confirmPassword){
        toast.error("Password Does not match");
        return;
      }
      setLoading(true);
      const { data } = await axios.post('/api/user/register', { name,email, password });

      if (!data) {
        toast.error("No response from server");
        return;
      }

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        toast.success("Registered successful!");
        navigate('/admin'); // change path as needed
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border shadow-xl rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-700">Signup</span> 
            </h1>
            <p className="font-light">
              Enter your credentials to register
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 w-full sm:max-w-md text-gray-600">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Enter Name"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

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
              <label> Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Confirm Password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            


     <div className="flex flex-col">
              <label>Confirm Password</label>
              <input
                onChange={(e) => setconfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                required
                placeholder="Enter Password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-700/90"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
      {loading && (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
    </div>
  );
};

export default SignUp;

