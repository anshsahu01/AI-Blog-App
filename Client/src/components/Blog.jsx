

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";

// socket imports
import { socket } from "../lib/socket";

function Blog() {
  const { id } = useParams();
  const { axios, userId } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // state for follow related features
  const [isFollowing, setIsfollowing] = useState(false);

  // Fetch blog details
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      if (res.data.success) {
        setData(res.data.blog);
        
        // Check if current user follows the blog author
        if (res.data.blog?.user?.followers?.includes(userId)) {
          setIsfollowing(true);
        } else {
          setIsfollowing(false);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blog: id });
      if (data) {
        console.log(data);
      }

      data.success
        ? setComments(data.comments)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Submit new comment
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content: comment,
      });
      if (data.success) {
        setName("");
        setComment("");
        toast.success("Comment added for review!");
        // Optionally refresh comments
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle follow button
  const handleFollow = async () => {
    try {
      console.log("button clicked");

      const targetUserId = data?.user?._id;
      if (!targetUserId) {
        console.log("--Target user not found");
        return;
      }
      console.log("--AUTHOR ID--",targetUserId);
      console.log("--USER ID--",userId);

      if (isFollowing) {
        const res = await axios.post(`/api/user/unfollow/${targetUserId}`, {
          userId: userId // Send current user ID in request body
        });

        if (!res) {
          console.log("No response received");
          return;
        }

        if (res.data.success) {
          toast.success(`Unfollowed ${data.user.name}`);
          setIsfollowing(false);
        } else {
          console.log("--ERROR IN UNFOLLOW--",res.data.message);
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`/api/user/follow/${targetUserId}`, {
          userId: userId // Send current user ID in request body
        });

        if (!res) {
          console.log("No response received");
          return;
        }

        if (res.data.success) {
          toast.success(`Following ${data.user.name}`);
          setIsfollowing(true);
        } else {
          console.log(res.data.message);
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log("---FOLLOW ERROR-- ", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchBlogData();
    fetchComments();

    // Socket connection and view tracking
    if (!socket.connected) {
      socket.connect();
    }

    const sessionKey = `viewed_${id}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);

    if (!alreadyViewed) {
      socket.emit("incrementView", { blogId: id });
      sessionStorage.setItem(sessionKey, "1");
    }

    const handleUpdate = ({ count }) => {
      setData((prev) => ({ ...prev, views: count }));
    };

    socket.on("updatedViewCount", handleUpdate);

    // for claps

    
    const handleClapUpdate = ({blogId : updateId, totalClaps}) => {

      if(updateId=== id){
        setData((prev)=> ({...prev, clapsCount : totalClaps}));
      }
    };

    socket.on("updatedClapCount", handleClapUpdate);

    return ()=>{
      socket.off("updatedClapCount", handleClapUpdate);
        socket.off("updatedViewCount", handleUpdate);
    }

 



  }, [id]); // Only depend on 'id' to avoid infinite loop

  return data ? (
    <div className="relative">
      <img
        src="gradientBackground.png"
        alt="gradient"
        className="absolute -top-50 -z-1 opacity-50"
      />

      {/* Blog Title & Details */}
      <div className="text-center mt-20 text-gray-600">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="font-medium text-gray-700">{data.user.name}</span>
          <button
            onClick={handleFollow}
            className="py-1 px-4 border rounded-full text-sm text-blue-700 font-medium hover:bg-blue-50"
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <p className="py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>

        <h2 className="my-5 max-w-lg mx-auto">{data.subTitle}</h2>

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm bg-blue-700/5 font-medium">
          {data.category}
        </p>
        
        {/* section for views */}
        <div className="flex items-center justify-center gap-2 text-gray-700 mb-6">
          <Eye size={20} />
          <span className="text-sm font-medium">{data.views} views</span>
        </div>
      </div>

      {/* Blog Image */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="rounded-3xl mb-5 w-full"
        />
      </div>

      {/* Section for Claps */}

     {/* Section for Claps, Share, Save */}
<div className="flex items-center justify-between max-w-5xl mx-auto mt-4 px-4">
  {/* Left: Claps */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => socket.emit("addClap", { blogId: id,userId })}
      className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition"
    >
      <img src="/clap.png" alt="clap" className="w-5 h-5" />
      <span className="font-medium">{data?.clapsCount || 0}</span>
    </button>
  </div>

  {/* Right: Share & Save */}
  <div className="flex items-center gap-4">
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition"
    >
      <img src="/share.png" alt="share" className="w-5 h-5" />
      <span className="text-sm">Share</span>
    </button>

    <button
      onClick={() => toast.success("Saved to your reading list!")}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition"
    >
      <img src="/save.png" alt="save" className="w-5 h-5" />
      <span className="text-sm">Save</span>
    </button>
  </div>
</div>


      {/* Blog Content */}
      <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

      {/* Comments */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4 mb-8">
          {comments.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-blue-700/2 border max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="user_icon.svg" alt="usericon" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            className="flex flex-col items-start gap-4 max-w-lg"
            onSubmit={submitComment}
          >
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Your comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none resize-none"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-700 text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-500">Loading...</div>
  );
}

export default Blog;

