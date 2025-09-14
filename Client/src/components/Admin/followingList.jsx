import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

function FollowingList() {
  const { userId, axios, token } = useAppContext();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  
  if (token) {
    console.log("Token", token);
  }

  const fetchFollowing = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.get("/api/user/following", {
        headers: {
          Authorization: token, // Make sure token includes "Bearer " if needed
        },
      });

      if (!res) {
        toast.error("Unable to fetch Following");
        return;
      }

      const data = res.data;

      if (data && data.success) {
        console.log("Data", data);
        console.log("Following", data.following);
        setFollowing(data.following); // Fixed: was setFollowers
      } else {
        toast.error(data.message || "Unable to fetch Following");
        console.log("Data not found");
        return;
      }
    } catch (error) {
      console.error("Fetch following error:", error);
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (targetId) => {
    try {
      const res = await axios.post(
        `/api/user/unfollow/${targetId}`,
        { userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      if (res.data.success) {
        fetchFollowing(); // Refresh the list
        toast.success("Unfollowed User");
      }
    } catch (error) {
      console.log("Unfollow Error", error.message);
      toast.error("Failed to unfollow user");
    }
  };

  useEffect(() => {
    if (token) {
      fetchFollowing();
    }
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Following</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : following.length === 0 ? (
        <p className="text-gray-500">Not following anyone</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {following.map((user) => (
            <div
              key={user._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition min-w-0"
            >
              {/* User info */}
              <div className="flex-1 min-w-0 mb-3 sm:mb-0 sm:mr-4">
                <p className="text-lg font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">@{user.username}</p>
              </div>

              {/* Unfollow button */}
              <button 
                onClick={() => handleUnfollow(user._id)}
                className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition flex-shrink-0 w-full sm:w-auto"
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowingList;