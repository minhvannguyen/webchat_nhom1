import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

export default function Search({ isOpen }) {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    
    const handleInputChange = (e) => {
        setUserName(e.target.value);
         // Cập nhật giá trị userName khi người dùng nhập
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            const response = await axios.get(`http://localhost:8080/users/findByUserName/${userName}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
                
              });
            
              navigate('/profileClient', {
                state: {
                  userClient: response.data,
                }
              });
              
            
        } catch (error) {
            if (error.response && error.response.data) {
                // Lấy thông báo lỗi từ API
                toast.error("Không có người dùng với tên này.");
            } else {
                toast.error("Đã xảy ra lỗi không xác định.");
            }
        }
      };    

    if (!isOpen) return null;
    return (
        <form onSubmit={handleSubmit}>
        <div className="bg-white flex px-1 py-1 fixed z-[9999] mt-11  rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
            <input
                type="text"
                placeholder="Search Something..."
                className="w-full outline-none bg-white pl-4 text-sm"
                onChange={handleInputChange}
            />
            <button
                type='submit'
                className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2"
                
            >
                Search
            </button>
        </div></form>


    )
}
