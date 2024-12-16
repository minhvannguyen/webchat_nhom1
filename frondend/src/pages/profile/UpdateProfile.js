import axios from 'axios';
import React, {useState } from 'react'
import { Link } from 'react-router-dom'

export default function UpdateProfile() {

  const token = localStorage.getItem("token");

  const [imgTemp, setImgTemp] = useState("");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [message, setMessage] = useState({});
  const [postData, setPostData] = useState({
    id: localStorage.getItem("id"),
    userName: localStorage.getItem("userName"),
    bio: localStorage.getItem("bio"),
    address: localStorage.getItem("address"),
    isSingle: localStorage.getItem("isSingle"),
  })
//xử lý string image ko thể tải ảnh lên server theo kiểu này
  const handleFileChange = (e) => {
    let imageUrl = URL.createObjectURL(e.target.files[0]);
    setImgTemp(imageUrl);
    setAvatar(e.target.files[0]);
  };
  //kết thúc img 
  const formData = new FormData();  // Tạo một đối tượng FormData
    formData.append('avatar', avatar);
    formData.append("userDto", JSON.stringify(postData));  // postData là đối tượng JSON của bạn

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImgTemp("");
    setMessage({});
    try {
      const response = await axios.put(`http://localhost:8080/users/update/${postData.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',  // Đảm bảo header là multipart
        }
      });
      setAvatar(response.data.avatar);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('avatar', response.data.avatar);
        localStorage.setItem('address', response.data.address);
        localStorage.setItem('bio', response.data.bio);
        localStorage.setItem('isSingle', response.data.isSingle);
      setMessage({ success: "cập nhật thành công!" })
    }
    catch (error) {
      if (error.response && error.response.data) {
        // Lấy thông báo lỗi từ API
        setMessage({ errors: 'Đã xảy ra lỗi, vui lòng thử lại!' }); // Hiển thị thông báo lỗi từ backend
      } else {
        setMessage({ errors: 'Đã xảy ra lỗi, vui lòng thử lại!' });
      }
    }
  }

  return (
    <div className='flex justify-center  items-center h-screen '>
      <div className='w-full h-full lg:max-w-[500px] bg-transparent shadow-lg'>
        <title>User Profile</title>
        
          <div className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
            <div className="flex flex-col">

              <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
                <h2 className="mb-5 text-2xl font-bold text-blue-900">
                  Cập nhật trang cá nhân
                </h2>
                <div className="text-center">
                  <div>
                    <img
                      src={imgTemp ? imgTemp : avatar}
                      alt="Profile Picture"
                      className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
                    />
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      hidden
                      onChange={handleFileChange}

                    />
                    <label
                      htmlFor="avatar"
                      className="inline-flex items-center transform hover:scale-125 duration-200"
                    >
                      <svg
                        data-slot="icon"
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>

                </div>
              </div>
              {/* Bilgi Düzenleme Formu */}
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                {/* İsim ve Unvan */}
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={postData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tiểu sử
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={postData.bio}
                    onChange={handleChange}
                  />
                </div>
                {/* Organizasyon Bilgisi */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Đang ở
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={postData.address}
                    onChange={handleChange}
                  />
                </div>
                {/* İletişim Bilgileri */}
                <div>
                  <label
                    htmlFor="isSingle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tình trạng mối quan hệ
                  </label>
                  <input
                    type="text"
                    name="isSingle"
                    id="isSingle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={postData.isSingle}
                    onChange={handleChange}
                  />
                </div>

                {/* Kaydet ve İptal Butonları */}
                <div className="flex justify-end space-x-4">
                {message.errors && <p className='text-red-600'>{message.errors}</p>}
                {message.success && <p className='text-green-700'>{message.success}</p>}
                  <Link to="/profile"><button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button></Link>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>

                </div>
                
              </form>
            </div>
          </div>
          
      </ div></div>

  )
}
