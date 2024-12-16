import React, { useRef } from 'react'
import { FaTimes } from 'react-icons/fa';

export default function MessegerChat({ isOpenChat, CloseChat, userClient }) {

  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset chiều cao
    textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao dựa trên nội dung
  };

  

  if (!isOpenChat) return null;
  return (
    <div className="w-full h-full lg:max-w-[340px] bg-gray-200 fixed top-1 right-1 shadow-lg ">
      {/* Main Chat Area */}
      <div className="flex-1">
        {/* Chat Header */}
        <header className="bg-white p-4 flex justify-between items-center text-gray-700">
          <h1 className="text-2xl font-semibold">{userClient?.userName || "Guest"}</h1>
          <FaTimes className="w-5 h-5 text-blue-600  hover:text-red-600 cursor-pointer" onClick={CloseChat} />
        </header>
        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src={userClient?.avatar || "defaultAvatar.png"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">helo a</p>
            </div>
          </div>
          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                hi e, e ăn cơm chưa?
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="http://localhost:8080/uploads/images/1731599214837-download.jpg
"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="http://localhost:8080/uploads/images/1731635348355-images%20(8).jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">
                e ăn ròi ạ
              </p>
            </div>
          </div>
          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>
                e ăn cơm với gì?
              </p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="http://localhost:8080/uploads/images/1731599214837-download.jpg"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="http://localhost:8080/uploads/images/1731635348355-images%20(8).jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">
                e ăn với canh rau muống và cà rầm tương
              </p>
            </div>
          </div>
          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>ngon ko e</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="http://localhost:8080/uploads/images/1731599214837-download.jpg"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="http://localhost:8080/uploads/images/1731635348355-images%20(8).jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">dạ ngon</p>
            </div>
          </div>
          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>uk😊</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="http://localhost:8080/uploads/images/1731599214837-download.jpg"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="http://localhost:8080/uploads/images/1731635348355-images%20(8).jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">vầng</p>
            </div>
          </div>
          {/* Outgoing Message */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
              <p>uk</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img
                src="http://localhost:8080/uploads/images/1731599214837-download.jpg"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img
                src="http://localhost:8080/uploads/images/1731635348355-images%20(8).jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">vầng</p>
            </div>
          </div>
        </div>
        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              type="text"
              rows={1}
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
              gửi
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
