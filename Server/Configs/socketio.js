

import Blog from "../models/blog.model.js";

const initialiseSocket = (io) => {
  // temporary storage to keep track of users who have visited the blog
  const sessionViews = new Set();

  io.on("connection", (socket) => {
    console.log(`A user connected with the socket ID: ${socket.id}`);

    socket.on("incrementView", async ({ blogId }) => {
      try {
        const roomName = `blog.${blogId}`;
        socket.join(roomName); // join blog room

        const viewIdentifier = `${socket.id}-${blogId}`;

        // prevent duplicate views
        if (sessionViews.has(viewIdentifier)) {
          console.log(`${socket.id} has already seen the blog post ${blogId}`);

          const blogPost = await Blog.findById(blogId);
          if (blogPost) {
            socket.emit("updatedViewCount", { count: blogPost.views });
          }
          return;
        }

        // add to session views
        sessionViews.add(viewIdentifier);

        // update DB
        const updatedBlog = await Blog.findByIdAndUpdate(
          blogId,
          { $inc: { views: 1 } },
          { new: true }
        );

        if (updatedBlog) {
          const updatedViewCount = updatedBlog.views;
          console.log(
            `Blog ${blogId} view count updated to ${updatedViewCount}`
          );

          // broadcast updated count to everyone in this blog room
          io.to(roomName).emit("updatedViewCount", {
            count: updatedViewCount,
          });
        }
      } catch (error) {
        console.log("Error in incrementing the view count", error);
        socket.emit("error", { message: "Could not process your view" });
      }
    });

    // disconnect handler (outside incrementView)
    socket.on("disconnect", () => {
      console.log(`User with socket id ${socket.id} disconnected`);
      for (const item of sessionViews) {
        if (item.startsWith(socket.id)) {
          sessionViews.delete(item);
        }
      }
    });
  });
};

export default initialiseSocket;
