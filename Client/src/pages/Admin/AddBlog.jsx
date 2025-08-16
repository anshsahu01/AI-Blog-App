import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { marked } from "marked";
const AddBlog = () => {
  const { axios, token } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("thumbnail", image);

      if (token) {
        console.log(token);
      }

      // const { data } = await axios.post("/api/blog/add-blog", formData);
      //  const {data} =  await axios.post("/api/blog/add-blog", formData);

      const res = await axios.post("/api/blog/add-blog", formData, {
        headers: {
          Authorization: token, // sirf token, "Bearer " nahi
        },
      });

      if (res) {
        console.log("RESPONSE", res);
      } else {
        console.log("-------- response nhi aaya ------");
      }

      const data = res.data;
      console.log("------DATA----", data);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubtitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error, "ye error aaya hai");
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if (!title) {
      return toast.error("Please enter a title");
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/blog/generate", {
        prompt: title,
      }, {
        headers :{
          Authorization : token,
        }
      });
      if(res){
        console.log("-----res----",res);
      }else{
        console.log("RES NHI MILA");
      }
      const data = res.data;
      console.log(data);
      
      if (data.success) {
        console.log(data);
        quillRef.current.root.innerHTML = marked.parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const blogCategory = ["All", "Finance", "Tech", "Startup", "Lifestyle"];
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>

        <label className="cursor-pointer">
          <img
            src={!image ? "/upload_area.svg" : URL.createObjectURL(image)}
            alt="upload icon"
            className="mt-2 h-16 rounded"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Sub title</p>
        <input
          onChange={(e) => setSubtitle(e.target.value)}
          type="text"
          value={subTitle}
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
          disabled = {loading}
            onClick={generateContent}
            type="button"
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4">Blog category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rouded"
        >
          <option value="">Select category</option>
          // YAHAN PER SAARE CATEGORIES KO MAP KARNA HAI
          {blogCategory.map((item, idx) => {
            return (
              <option key={idx} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-blue-700 text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
