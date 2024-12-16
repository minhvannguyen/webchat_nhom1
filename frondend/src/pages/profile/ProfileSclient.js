import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Follower from './Follower';
import Followed from './Followed';
import UserPhotos from './UserPhotos';
import NavBar from '../NavBar';
import MessegerChat from '../message/MessegerChat';
import axios from 'axios';

export default function ProfileSclient() {

  const token = localStorage.getItem("token");

  const location = useLocation();
  const { userClient } = location.state;
  //logic follower
  const [isOpenFollower, setIsOpenFollower] = useState(false);
  const openFollower = () => {
    setIsOpenFollower(true);
  };
  const closeFollower = () => {
    setIsOpenFollower(false);
  };
  //kết thúc logic follower
  //logic số lượng bài viết
  const [numberPost, setNumberPost] = useState(false);

  //logic followed
  const [isOpenFollowed, setIsOpenFollowed] = useState(false);
  const openFollowed = () => {
    setIsOpenFollowed(true);
  };
  const closeFollowed = () => {
    setIsOpenFollowed(false);
  };
  //kết thúc logic followed
  const [avatar, setAvatar] = useState(userClient?.avatar || "defaultAvatar.png");
  const [userName, setUserName] = useState(userClient?.userName || "Guest");

  useEffect(() => {
    const fetchData = async () => {
    

      const followData = {
        idFollower: localStorage.getItem("id"),
        idFollowing: userClient.id,
      };

      try {
        const response = await axios.post(`http://localhost:8080/follow/isFollowed`, followData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setIsFollow(response.data); // response.data chứa giá trị boolean
      } catch (error) {
        console.error("Lỗi khi kiểm tra theo dõi:", error);
      }
    };

    if (userClient && token) {
      fetchData();
    }
  }, [userClient, token]);
  const getNumberPost = (data) => {
    setNumberPost(data);
  };

  //logic chat
  const [isOpenChat, setIsOpenChat] = useState(false);
  const openChat = () => {
    setIsOpenChat(true);
  };
  const closeChat = () => {
    setIsOpenChat(false);
  };
  //kết thúc logic chat

  //logic theo dõi
  const [isFollow, setIsFollow] = useState(null);
  const userData = {
    idFollower: localStorage.getItem('id'),
    idFollowing: userClient.id,
  };
  const handleSubmitFollow = async () => {
    await axios.post("http://localhost:8080/follow", userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    setIsFollow(!isFollow);
    fetchNumberFollower();
    fetchNumberFollowing();
  };
  const handleSubmitUnFollow = async () => {
    await axios.delete("http://localhost:8080/follow/unFollow", {
      data: userData,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    setIsFollow(!isFollow);
    fetchNumberFollower();
    fetchNumberFollowing();
  };

  const handleClick = () => {
    if (isFollow) {
      handleSubmitUnFollow();
    } else {
      handleSubmitFollow();
    }
    
  };

  //logic số lượng follower
  // Trạng thái lưu số lượng người theo dõi
  const [numberFollower, setNumberFollower] = useState(0);

  // Hàm lấy số lượng người theo dõi từ API
  const fetchNumberFollower = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/follow/numberFollower/${userClient.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNumberFollower(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng người theo dõi:", error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchNumberFollower();
  }, [userClient.id, token]);

  //logic số lượng following
  // Trạng thái lưu số lượng người theo dõi
  const [numberFollowing, setNumberFollowing] = useState(0);

  // Hàm lấy số lượng người theo dõi từ API
  const fetchNumberFollowing = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/follow/numberFollowed/${userClient.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNumberFollowing(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy số lượng người đang theo dõi:", error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchNumberFollowing();
  }, [userClient.id, token]);

  // Lấy về tin nhắn
  

  return (
    <div className="flex justify-center  items-center h-screen ">
      <MessegerChat
        isOpenChat={isOpenChat}
        OpenChat={openChat}
        CloseChat={closeChat}
        userClient={userClient}
      />
      <div className="w-full h-full lg:max-w-[450px] bg-transparent shadow-lg relative">
        <NavBar />
        <div className="max-w-2xl mx-auto">
          <div className="px-3 py-2">
            <div className="flex flex-col gap-1 text-center">
              <img
                className="block mt-5 mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg"
                src={avatar}
                alt='anh dai dien'
              />
              <p className="font-serif font-semibold">{userName}</p>
              <span className="text-sm text-gray-400">
                {userClient.bio}
              </span>
              <span className="text-sm text-gray-400">
                {userClient.address}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 my-3">
              <div className="font-semibold text-center mx-4">
                <p className="text-black">{numberPost}</p>
                <span className="text-gray-400">Bài viết</span>
              </div>
              <button className="font-semibold text-center mx-4" onClick={openFollower}>
                <p className="text-black">{numberFollower}</p>
                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">Người theo dõi</span>

              </button>
              <Follower
                IsOpenFollower={isOpenFollower}
                Open={openFollower}
                Close={closeFollower}
                
              />
              <button className="font-semibold text-center mx-4" onClick={openFollowed}>
                <p className="text-black">{numberFollowing}</p>
                <span className="text-gray-400 hover:text-blue-600 cursor-pointer">Đang theo dõi</span>
              </button>
              <Followed
                IsOpenFollowed={isOpenFollowed}
                Open={openFollowed}
                Close={closeFollowed}
              />
            </div>
            <div className="flex justify-center gap-2 my-5">
              <button onClick={handleClick} className=" bg-red-400 hover:bg-pink-600 cursor-pointer px-5 py-1 rounded-full text-white shadow-lg">
                {isFollow ? "Đã theo dõi" : "Theo dõi"}
              </button>

              <button
                id="dropdownDefaultButton"
                className=" bg-blue-400 hover:bg-blue-600 cursor-pointer px-5 py-1 rounded-full text-white shadow-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                type="button"
                onClick={openChat}
              >
                Nhắn tin

              </button>
            </div>
            <div className="flex justify-between items-center">
              <button className="w-full py-2 border-b-2 border-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button className="w-full py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
            <div className="">
              <UserPhotos className="grid grid-cols-3 gap-2 my-3" idUser={userClient.id} numberPost={getNumberPost} />
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}
