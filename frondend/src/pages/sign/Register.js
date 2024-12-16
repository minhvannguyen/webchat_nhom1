import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Register() {
  const [userData, setUserData] = useState({
     gmail: '', 
     password: '',
     firstName: '',
     userName: '',
    });
    const [checkPassword, setCheckPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };
    const handleChangePass = (e) => {
      setCheckPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({}); // Reset lỗi trước khi gửi yêu cầu
      setSuccessMessage('');
      

      if (userData.password !== checkPassword) {
        setErrors({ comfirmPassword: 'Mật khẩu không khớp!' });
        return; // Dừng xử lý nếu mật khẩu không khớp
      }

      try {
          await axios.post("http://localhost:8080/users", userData);
          setSuccessMessage('Đăng ký thành công!');
          setUserData({ 
            gmail: '', 
            password: '',
            firstName: '',
            userName: '',
          }); 
          setCheckPassword('')
          // Reset form
      } catch (error) {
          if (error.response && error.response.data) {
              // Lấy thông báo lỗi từ API
              setErrors(error.response.data);
          } else {
            setErrors({general: "Đã xảy ra lỗi không xác định."});
          }
      }
    };

  return (
    <>
  {/* component */}
  {/* Container */}
  <div className="container mx-auto">
    <div className="flex justify-center px-6 my-12">
      {/* Row */}
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        {/* Col */}
        <img src='resources/logo_m.png' alt='logo1' className='w-96 h-96'></img>
        {/* Col */}
        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h3 className="pt-4 text-2xl text-center">Đăng ký tài khoản thôi nào!</h3>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="firstName"
                >
                  Họ 
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Họ của bạn"
                  onChange={(e)=>handleChange(e)}
                  value={userData.firstName}
                />
              </div>
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="userName"
                >
                  Tên 
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Tên của bạn"
                  onChange={(e)=>handleChange(e)}
                  value={userData.userName}
                />
                {errors.userName && <p className='text-red-700'>{errors.userName}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="gmail"
                name="gmail"
                placeholder="Email"
                onChange={(e)=>handleChange(e)}
                value={userData.gmail}
              />
              {errors.gmail && <p className='text-red-700'>{errors.gmail}</p>}
            </div>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="******************"
                  onChange={(e)=>handleChange(e)}
                  value={userData.password}
                />
                {errors.password && <p className='text-red-700'>{errors.password}</p>}
              </div>
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="c_password"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="checkPassword"
                  type="password"
                  name="checkPassword"
                  placeholder="******************"
                  onChange={(e)=>handleChangePass(e)}
                  value={checkPassword}
                />
                {errors.comfirmPassword && <p className='text-red-700'>{errors.comfirmPassword}</p>}
              </div>
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Đăng ký tài khoản
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className='flex'>
               <div className='text-gray-500 mr-3'>Bạn đã có tài khoản?</div>
               <Link className='text-blue-700 decoration-2 hover:underline' to="/">Đăng nhập thôi!</Link>
            </div>
            
          </form>
          {successMessage && <p className="text-green-600 ml-8">{successMessage}</p>}
          {errors.general && <p className="text-red-700 ml-8">{errors.general}</p>
        }
        </div>
      </div>
    </div>
  </div>
</>

  )
}
