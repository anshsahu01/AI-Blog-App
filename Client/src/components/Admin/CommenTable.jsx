import React from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const CommenTable = ({ comment, fetchComments }) => {
  const { axios, token, blogs } = useAppContext();

  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post(
        "/api/admin/approve-comment",
        { id: _id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  
  const deleteComment = async () => {
    try {

        const confirm = window.confirm('Are you sure you want to delete comment');
        if(!confirm){
            return;
        }

      const { data } = await axios.post(
        "/api/admin/delete-comment",
        { id: _id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{BlogDate.toLocaleString()}</td>
      <td className="px-6 py-4 flex">
        <div className="flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src="/tick_icon.svg"
              alt="tickicon"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
          onClick={deleteComment}
            src="/bin_icon.svg"
            alt="bin-icon"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommenTable;
