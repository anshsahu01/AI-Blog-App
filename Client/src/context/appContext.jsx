

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
      const res = await axios.get("/api/blog/user-blogs", {
        headers: {
          Authorization: token,
        }
      });
      if (!res) {
        console.log("Error in fetching user blogs");
        return [];
      }
      const data = res.data;
      if (data.success) {
        return data.blogs;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  // Custom setToken function that also handles userId
  const handleSetToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      delete axios.defaults.headers.common["Authorization"];
      setuserId("");
    }
  };

  // Custom setUserId function that persists to localStorage
  const handleSetUserId = (newUserId) => {
    setuserId(newUserId);
    if (newUserId) {
      localStorage.setItem("userId", newUserId);
    } else {
      localStorage.removeItem("userId");
    }
  };

  useEffect(() => {
    // Restore token and userId from localStorage
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    if (storedUserId) {
      setuserId(storedUserId);
    }

    // Fetch blogs on initial load (blogs are public, no auth needed)
    fetchBlogs();
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken: handleSetToken, // Use custom handler
    blogs,
    setBlogs,
    input,
    setInput,
    userId,
    setuserId: handleSetUserId, // Use custom handler
    fetchUserBlogs
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
