import React, { useState } from 'react';
import { FaHome, FaCommentDots, FaBell, FaUser, FaPlus, FaSearch } from 'react-icons/fa';
import PostNews from './post/PostNews';
import PostNews1 from './post/PostNews1';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import Search from './Search';
import Messeger from './message/Messeger';

const NavBar = () => {
//logic tạo bài đăng mới
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onclose = () => {
    setSelectedFile('');
    setIsModalOpen(false);
  };

  let imageUrl = '';
  selectedFile && ( imageUrl = URL.createObjectURL(selectedFile));
  
 
  const handleFileSelect = (e) => {
  ;
    
      setSelectedFile(e.target.files[0]);
      // Có thể xử lý file tại đây, ví dụ: upload hoặc preview
    
  };
  //kết thúc logic tạo bài đăng

  //logic thông báo
  const [isOpenNotication, setIsOpenNotication] = useState(false);
  const openNotication = () => {
    setIsOpenNotication(true);
  };
  const closeNotication = () => {
    setIsOpenNotication(false);
  };
  //kết thúc logic thông báo

  //logic tin nhắn
  const [isOpenMess, setIsOpenMess] = useState(false);
  const openMess = () => {
    setIsOpenMess(true);
  };
  const closeMess = () => {
    setIsOpenMess(false);
  };
  //kết thúc logic tin nhắn

  //logic search
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const openSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };
  
  //kết thúc logic search
  
  return (
    <div className="w-full h-14 bg-transparent top-0 z-10 ">
      <div className="max-w-4xl bg-white mx-auto px-4 h-12 flex items-center justify-between fixed z-[8888]">
        <div className="text-xl font-bold text-blue-400 flex mr-24">
          minhminh
          <FaSearch className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" onClick={openSearch}/>
          <Search 
            isOpen={isOpenSearch}
            Open={openSearch}
          />
        </div>

        {/* Icon điều hướng */}
        <div className="flex space-x-6">
          <FaPlus className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" onClick={openModal} />
          <PostNews
            isOpen={isModalOpen}
            Close={closeModal}
            onFileSelect={handleFileSelect}
          />
          <PostNews1 
            imgfile={selectedFile} 
            close={onclose}
            fileUrl={imageUrl}
          />
          <Link to="/home">
              <FaHome className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
          </Link>
          
          <FaCommentDots className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" onClick={openMess}  />
          <Messeger
            isOpen={isOpenMess}
            Open={openMess}
            Close={closeMess}
          />

          <FaBell className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" onClick={openNotication} />
          <Notification 
             isOpen={isOpenNotication}
             Open={openNotication}
             Close={closeNotication}
          />
          <Link to="/profile">
              <FaUser className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
