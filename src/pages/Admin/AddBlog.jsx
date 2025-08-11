
import React,{useState,useRef, useEffect} from 'react'
import Quill from 'quill';
const AddBlog = () => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle,setSubtitle] = useState('');
  const [category,setCategory] = useState('');
  const [isPublished,setIsPublished] = useState(false);
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
  }

  const generateContent =async ()=>{
    // function for ai content
    console.log("ai content button");
  }


  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme : 'snow'});
    }
  },[])



  const blogCategory = [
    "All","Finance","Tech","Startup","Lifestyle"
  ]
  return (
   <form onClick={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
   <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
    <p>Upload Thumbnail</p>
    <label htmlFor='image'>
      <img src={!image ? '/upload_area.svg' : URL.createObjectURL(image)} alt='upload icon' className='mt-2 h-16 rounded cursor-pointer' />
      <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
    </label>

 
      <p className='mt-4'>Blog title</p>     
      <input onChange={(e)=>setTitle(e.target.value)} type='text' value={title}  placeholder='Type here' required
      className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'/>

      <p className='mt-4'>Sub title</p>     
      <input onChange={(e)=>setTitle(e.target.value)} type='text' value={subTitle}  placeholder='Type here' required
      className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'/>


    <p className='mt-4'>Blog Description</p>
    <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
      <div ref={editorRef}></div>
      <button onClick={generateContent} type='button' className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
    </div>

    <p className='mt-4'>Blog category</p>
    <select onChange={(e)=>setCategory(e.target.value)} name='category' className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rouded'>
      <option value="">Select category</option>
      // YAHAN PER SAARE CATEGORIES KO MAP KARNA HAI
{      blogCategory.map((item,idx)=>{
        return <option key={idx} value={item}>{item}</option> })}
    </select>

    <div className='flex gap-2 mt-4'>
      <p>Publish Now</p>
      <input type='checkbox' checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)}/>
    </div>

    <button type='submit' className='mt-8 w-40 h-10 bg-blue-700 text-white rounded cursor-pointer text-sm'>Add Blog</button>
    </div> 
   </form>
  )
}

export default AddBlog
