import React, { useEffect, useState } from "react";
// import { blogs } from "../../main";
import BlogTable from "../../components/Admin/BlogTable";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { fetchUserBlogs } = useAppContext();

  const [blogData, setBlogData] = useState([]);

  const [dashboarddata, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios, token } = useAppContext();
  // console.log(dashboarddata);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: token,
        },
      });

      const data = res.data;

      if (data.success) {
        setDashboardData(data.dashboardData);

        // toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const fetchBlogs = async () => {
  //   setBlogData(blogs);
  // };

  const loaduserBlogs = async () => {
    if (token) {
      const blogs = await fetchUserBlogs();
      if (blogs.length === 0) {
        toast.success("User has no blogs");
      }
      setBlogData(blogs);
    }
  };

  useEffect(() => {
    loaduserBlogs();
    fetchDashboard();
  }, [token]);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src="dashboard_icon_1.svg" alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboarddata.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src="dashboard_icon_2.svg" alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboarddata.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src="dashboard_icon_3.svg" alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboarddata.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex  items-center  gap-3 m-4 mt-6 text-gray-600">
          <img src="dashboard_icon_4.svg" alt="dashboard icon" className="" />
          <p className="">Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4">
          <table className=" w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-2 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-2">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-2 max-sm:hidden">
                  Date
                </th>

                <th scope="col" className="px-2 py-2 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-2">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {blogData.map((item, index) => (
                <BlogTable
                  key={item._id}
                  blog={item}
                  fetchBlogs={loaduserBlogs}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
