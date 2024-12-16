import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function ChangePassword({Back}) {
  const location = useLocation();
  const backUrl = location.state?.back || "/defaultBackUrl";

  const [checkPassword, setCheckPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState({
    gmail: '', 
    password: '',
   });

   const handleChangePass = (e) => {
    setCheckPassword(e.target.value);
  }


   const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset lỗi trước khi gửi yêu cầu
    setSuccessMessage('');
    

    if (userData.password !== checkPassword) {
      setErrors({ comfirmPassword: 'Mật khẩu không khớp!' });
      return; // Dừng xử lý nếu mật khẩu không khớp
    }

    try {
        await axios.post("http://localhost:8080/resetPassword", userData);
        setSuccessMessage('Đặt lại mật khẩu thành công!');
        setUserData({ 
          gmail: '', 
          password: '',
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
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <Link to={backUrl}>
    <FaArrowLeft
  className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" 
/></Link>
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Đổi mật khẩu
      </h2>
      <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="gmail"
            id="gmail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required=""
            onChange={(e)=>handleChange(e)}
            value={userData.gmail}
          />
          {errors.gmail && <p className='text-red-700'>{errors.gmail}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e)=>handleChange(e)}
            value={userData.password}
          />
          {errors.password && <p className='text-red-700'>{errors.password}</p>}
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            id="checkPassword"
            type="password"
            name="checkPassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e)=>handleChangePass(e)}
            value={checkPassword}
          />
          {errors.comfirmPassword && <p className='text-red-700'>{errors.comfirmPassword}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                
        >
          Reset passwod
        </button>
        <div className='flex justify-center items-center text-center'>
               <Link className='text-blue-700 decoration-2 hover:underline' to="/">Đăng nhập</Link>
        </div>
      </form>
      {successMessage && <p className="text-green-600 ml-8 text-center">{successMessage}</p>}
      {errors.general && <p className="text-red-700 ml-8 text-center">{errors.general}</p>}
    </div>
  </div>
</section>

  )
}
