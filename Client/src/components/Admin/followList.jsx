import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

function FollowList() {
  const { userId, axios, token } = useAppContext();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  if (token) {
    console.log("TOken", token);
  }

  const fetchFollowers = async () => {
    if (!token) {
      return;
    }
    try {
      const res = await axios.get("/api/user/followers", {
        headers: {
          Authorization: token,
        },
      });

      if (!res) {
        toast.error("Unable to fetch Followers");

        return;
      }

      const data = res.data;

      if (data && data.success) {
        console.log("Data", data);
        console.log("Fo", data.followers);
        setFollowers(data.followers);
      } else {
        toast.error("Unable to fetch Followers");
        console.log("Data no found");
        return;
      }
    } catch (error) {
     toast.error(error.message);
      return;
    }finally{
      setLoading(false);
    }
  };


  const handleFollow = async(targetId) => {
    try {
      const res = await axios.post(
        `/api/user/follow/${targetId}`,
        {userId}

      )

      if(res.data.success){
        fetchFollowers(); //list ko update karenge
      }
      
    } catch (error) {

      console.log("Follow error", error.message);
      return;
      
    }
  }


  const handleUnfollow = async (targetId) => {
    try {

      const res = await axios.post(
        `/api/user/unfollow/${targetId}`,
        {userId}
      );

      if(res.data.success){
        fetchFollowers();
      }

      toast.success("Unfollowed User");
      
    } catch (error) {

      console.log("Unfollow Error", error.message);
      return;
      
    }

  }

  useEffect(() => {
    if(token){
    fetchFollowers();
  }
  }, [token]);

  return(
<div className="p-4">
  <h2 className="text-xl font-semibold mb-4">Followers</h2>
  {loading ? (
    <p className="text-gray-500">Loading...</p>
  ) : followers.length === 0 ? (
    <p className="text-gray-500">User has no followers</p>
  ) : (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {followers.map((follower) => (
        <div
          key={follower.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition min-w-0"
        >
          {/* User info */}
          <div className="flex-1 min-w-0 mb-3 sm:mb-0 sm:mr-4">
            <p className="text-lg font-medium text-gray-900 truncate">
              {follower.name}
            </p>
            <p className="text-sm text-gray-500 truncate">@{follower.username}</p>
          </div>
          
          {/* Follow button */}
          <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium border border-gray-300 hover:bg-gray-50 transition flex-shrink-0 w-full sm:w-auto">
            Follow
          </button>
        </div>
      ))}
    </div>
  )}
</div>


      )
    }







 

export default FollowList;





