import React, { useEffect, useState } from 'react'
import Cmt from '../Cmt';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

export default function PostDetail({Close, isOpen, postData}) {

  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("id");

  //logic comment
  const [isOpenCmt, setIsOpenCmt] = useState(false);
  const openCmt = () => {
    setIsOpenCmt(true);
  };
  const closeCmt = () => {
    setIsOpenCmt(false);
  };
  //kết thúc logic comment
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "defaultAvatar.png");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Guest");

  //click tym
  const [isFilled, setIsFilled] = useState(false);

  const tymData = {
    idPost: postData.idPost,
    idUser: idUser,
  };

  const handleTym = async () => {
    try {
      await axios.post(`http://localhost:8080/tym/Tymed`, tymData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsFilled(!isFilled);
      fetchNumberTym(postData.idPost);

    } catch (error) {
      console.error("Lỗi tym:", error);
    }
  };

  const handleDelTym = async () => {
    try {
      await axios.delete("http://localhost:8080/tym/unTym", {
        data: tymData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsFilled(!isFilled);
      fetchNumberTym(postData.idPost);

    } catch (error) {
      console.error("Lỗi tym:", error);
    }
  };


  const handleClickTym = () => {
    if (isFilled) {
      handleDelTym();
    } else {
      handleTym();
    }
  };

  // Hàm lấy số lượng người tym
  const [numberTym, setNumberTym] = useState(0);

  const fetchNumberTym = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/tym/numberTym/${postData.idPost}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNumberTym(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng người tym:", error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      // Gọi API số lượng Tym
      await fetchNumberTym();

      const tymData = {
        idPost: postData.idPost,
        idUser: idUser,
      };

      try {
        // Gọi API kiểm tra xem đã Tym chưa
        const response = await axios.post(`http://localhost:8080/tym/isTym`, tymData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Lưu kết quả vào state
        setIsFilled(response.data);
      } catch (error) {
        console.error("Lỗi khi kiểm tra Tym:", error);
      }
    };

    // Gọi fetchData khi postData.idPost, token hoặc idUser thay đổi
    if (postData.idPost && token && idUser) {
      fetchData();
    }
  }, [postData.idPost, token, idUser]);


  if(!isOpen) return null;
  return (
    <div className="w-full fixed inset-0 bg-black lg:min-w-[500px] bg-opacity-50 z-[9999] flex items-center justify-center min-h-screen">
      <Cmt
          isOpen={isOpenCmt}
          Open={openCmt}
          Close={closeCmt}
          idPost={postData.idPost}
        />
      <div className="bg-white min-w-[400px] h-[500px] scale-90 shadow-xl rounded-lg relative">
      <FaTimes className="w-5 h-5 text-blue-600  hover:text-red-600 cursor-pointer ml-52 absolute top-0 right-0 m-2" onClick={Close}/>
        <div className="border-b border-gray-100" />
        <div className="text-gray-400 font-medium mb-6 text-sm mt-6 mx-3 px-2 h-[350px]">
          
            <div className=" rounded-xl w-full h-full flex justify-center items-center">
              <img
                className="h-auto w-auto max-h-full max-w-full object-contain"
                src={postData.imageUrl}
                alt=""
              />
            </div>
          
        </div>

        <div className="text-gray-700 text-sm mx-3 px-2">
          {postData.content}
        </div>
        <div className="text-gray-500 text-sm mx-3 px-2">
          {postData.date}
        </div>

        <div className="flex justify-start mb-12 border-t mt-3 border-gray-100">
          <div className="flex w-full mb-4 mt-1 pt-2 pl-5">
            <div className="flex flex-row py-1">
              <div className="w-auto h-auto rounded-full">
                <img
                  className="w-9 h-9 object-cover rounded-full shadow cursor-pointer"
                  alt="User avatar"
                  src={avatar}
                />
              </div>
              <div className="flex flex-col ml-2 ">
                <div className="text-gray-600 text-sm font-bold ml-2">{userName}</div>
              </div>
            </div>


          </div>
          <div className="flex justify-end w-full mt-1 pt-2 pr-5">
          <div className="mr-1 mt-1 text-gray-400 text-sm"> {numberTym}</div>
            <span className=" mr-2 transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
              <svg
                onClick={handleClickTym}
                className="h-4 w-4 text-red-500 "
                fill={isFilled ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
            </span>
            <span onClick={openCmt} className="mr-2 transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M21 14c0 1.38-1.8 2.5-4 2.5H6l-4 4V7c0-1.38 1.8-2.5 4-2.5h10c2.2 0 4 1.12 4 2.5v7z"
                />
              </svg>
            </span>

            <span className="mr-2 transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="14px"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </span>

          </div>
        </div>  
      </div>
      
    </ div>

  )
}
