import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import CmtComponent from './CmtComponent';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cmt({ isOpen, Close, idPost }) {

  const token = localStorage.getItem("token");

  //logic up bình luận
  const [cmtData, setCmtData] = useState({
    idUser: localStorage.getItem("id"),
    idPost: idPost,
    content: '',
  })

  const handleChangeCmt = (event) => {
    setCmtData((prevData) => ({
      ...prevData, // Sao chép các thuộc tính khác của cmtData
      content: event.target.value, // Cập nhật thuộc tính content
    }));
  };
  


  const handleSubmitCmt = async (e) => {
    e.preventDefault();
    try {
      // Gửi bình luận lên API
      await axios.post("http://localhost:8080/comment/up", cmtData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      
  
      // Reset lại dữ liệu bình luận
      setCmtData((prevData) => ({
        ...prevData,
        content: '',
      }));
      // Cập nhật lại danh sách bình luận mà không cần gọi fetch lại
      fetchComments();
  
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Có lỗi xảy ra khi gửi bình luận");
    }
  };
  

  //logic lấy cmt về
  const [cmts, setCmts] = useState([]);

  // Hàm lấy danh sách bình luận từ API
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/comment/allComment/${idPost}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCmts(response.data); // Cập nhật danh sách bình luận vào state
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy về bình luận");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  
  if (!isOpen) return null;
  return (
    <div className="w-full h-full  fixed z-[9999] inset-0 bg-black bg-opacity-50 flex justify-between items-center">
      <div className="w-full max-w-7xl top-24 h-full overflow-y-auto mb-44 px-4 relative md:px-5 lg:px-5 mx-auto">      
        <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
          <h2 className="text-gray-300 text-2xl mt-16 font-bold font-manrope leading-normal">
            200+ lời bình
          </h2>
          <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
            <div className='w-full flex justify-center fixed top-5 left-1/2 transform -translate-x-1/2 z-[8888] items-center'>
            <div className="w-full max-w-4xl flex items-center justify-between gap-2 ">
              <input
                onChange={handleChangeCmt}
                value={cmtData.content}
                type="text"
                className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                placeholder="cho lời bình...."
              />
              <a href="" className="absolute right-36 top-[18px]">
                <svg
                  onClick={handleSubmitCmt}
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                    stroke="#111827"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              
            </div>
               <FaTimes className="w-10 h-10 text-red-600 absolute top-3 right-9 hover:text-blue-600 cursor-pointer" onClick={Close} />
            </div>
            <div>
              {cmts.map(cmt => (
                <CmtComponent
                   cmt={cmt}
                   refresh={fetchComments}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
