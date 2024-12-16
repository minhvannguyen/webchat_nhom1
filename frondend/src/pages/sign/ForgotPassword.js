import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [gmail, setGmail] = useState('');
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setGmail(e.target.value);
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setMessage(true);
    setErrors('');

    try {
      
      await axios.post("http://localhost:8080/forgotPassword", {gmail});
      navigate(`/confirmOtp?gmail=${gmail}`);
      
    } catch(error) {
      setIsDisabled(false);
      setMessage(false);
      if (error.response && error.response.data) {
        // Lấy thông báo lỗi từ API
        setErrors(error.response.data);
    } else {
      setErrors("Đã xảy ra lỗi không xác định.");
    }
    }
    
  }
  return (
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
  <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
          Quên mật khẩu?
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Bạn nhớ mật khẩu?
          <Link
            className="text-blue-600 decoration-2 hover:underline font-medium"
            to="/"
          >
            Đăng nhập!
          </Link>
        </p>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold ml-1 mb-2 dark:text-white"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  required=""
                  aria-describedby="email-error"
                  onChange={handleChange}
                  value={gmail}
                />
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                Please include a valid email address so we can get back to you
              </p>
            </div>
            <button
              type="submit"
              to = "/comfirmOtp"
              disabled={isDisabled} // Vô hiệu hóa nút nếu isDisabled là true
              className={isDisabled ? "py-3 px-4 inline-flex justify-center items-center bg-gray-500 text-white gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" 
                : "py-3 px-4 inline-flex justify-center items-center bg-blue-500 text-white hover:bg-blue-700 gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"}
            >
              {message ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
    <Link
      className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
      href="#"
    >
      Contact us!
    </Link>
    {errors && <p className='text-red-700'>{errors}</p>}
  </div>
</main>

  )
}
