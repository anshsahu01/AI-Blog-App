import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-purple-200 border-r-4 "
          }`
        }
      >
        <img src="/home_icon.svg" alt="homeicon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-purple-200 border-r-4 "
          }`
        }
      >
        <img src="/add_icon.svg" alt="homeicon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add blogs</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-purple-200 border-r-4 "
          }`
        }
      >
        <img src="/list_icon.svg" alt="listicon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">List blogs</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-purple-200 border-r-4 "
          }`
        }
      >
        <img src="/comment_icon.svg" alt="listicon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
