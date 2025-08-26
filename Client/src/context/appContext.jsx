import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setuserId] = useState("");
  // const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // to fetch user blogs 
  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get("/api/blog/user-blogs",{
        headers : {
          Authorization : token,
        }
      });
      if(!res){
        console.log("Error in fetching user blogs");

      }
      const data = res.data;
      if(data.success){
       
        return data.blogs;

      }else{
        toast.error(data.message);
        return [];
      }


      
    } catch (error) {
      toast.error(error.message);
      return;
      
    }
  }

  useEffect(() => {
    

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      fetchBlogs();
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    userId,
    setuserId,
    fetchUserBlogs
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
