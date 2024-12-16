import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostNews1({imgfile, close, fileUrl }) {

  const token = localStorage.getItem("token");

  const date = new Date();
  const [postData, setPostData] = useState({
    content: '',
    date: date.toLocaleDateString(),
  });

  const formData = new FormData();  // Tạo một đối tượng FormData
    formData.append('imgfile', imgfile);
    formData.append("postDto", JSON.stringify(postData));
    formData.append("idUser", localStorage.getItem("id"));

  useEffect(() => {
    if (fileUrl) {
      // Cập nhật imageUrl trong postData nếu imageUrl có giá trị
      setPostData((prevData) => ({
        ...prevData,
        imageUrl: fileUrl,
      }));
    }
  }, [fileUrl]);
  const handleCancleBtn = (e) => {
    close();
  }

  const handleNameChange = (e) => {
    setPostData((prevStatus) => ({
      ...prevStatus,
      content: e.target.value, // Chỉ cập nhật name
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =await axios.post("http://localhost:8080/posts/up", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',  // Đảm bảo header là multipart
        }
      });
      toast.success(response.data);
    }
    catch (error) {
      if (error.response && error.response.data) {
          // Lấy thông báo lỗi từ API
          toast.error(error.response.data); // Hiển thị thông báo lỗi từ backend
            } else {
              toast.error("đã có lỗi xảy ra!.");
            }
  }
  }
  if (!fileUrl) {
    return null;
  } 
  return (
    <div className="w-full fixed inset-0 bg-black bg-opacity-50 z-50">
      {/* component */}
      <div className="heading text-center font-bold text-2xl m-5 text-white">
        Bài đăng
      </div>
      <form onSubmit={handleSubmit}>
      <div className="editor mx-auto w-96 flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl">
        <input
          className="title  p-2 mb-4 bg-transparent text-white"
          spellCheck="false"
          placeholder="Hãy viết gì đó..."
          type="text"
          name='content'
          onChange={handleNameChange}
        />
        <div className='flex justify-center items-center'>
          <img
            className="w-8/12 h-64 p-2 object-contain"
            alt='ảnh của bạn'
            src={fileUrl}
          />
        </div>
        {/* icons */}
        <div className="icons flex text-gray-500 m-2">
          <svg
            className="mr-2 cursor-pointer hover:text-gray-900 bg-white border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            className="mr-2 cursor-pointer hover:text-gray-900 bg-white border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            className="mr-2 cursor-pointer hover:text-gray-900 border rounded-full p-1 h-7 bg-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
          <div className="count ml-auto text-gray-200 text-xs font-semibold">
            0/300
          </div>
        </div>
        {/* buttons */}
        <div className="buttons flex">
          
          <button className="btn bg-red-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto" type='button' onClick={handleCancleBtn}>
            Cancel
          </button>
          <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" type='submit'>
            Post
          </button>
        </div>
      </div>
      </form>
      
    </div>
    

  )
}
