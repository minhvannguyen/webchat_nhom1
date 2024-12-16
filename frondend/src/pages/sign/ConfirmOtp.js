import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'


export default function ConfirmOtp() {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gmail = queryParams.get('gmail');

    const [message, setMessage] = useState({});
    const [otpgmail, setOtpgmail] = useState({
        gmail: gmail,
        otp: ''
    });
    

    const handleChange = (e) => {
        setOtpgmail(prevState => ({
            ...prevState,
            otp: e.target.value
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({});

        try {

            const response = await axios.post("http://localhost:8080/verifyOtp", otpgmail);
            if (response.status === 200) {
                
                setMessage({success: 'Xác nhận thành công!'});
              }
            
            navigate("/changePassword")
        } catch (error) {
            if (error.response && error.response.data) {
                // Lấy thông báo lỗi từ API
                setMessage({errors: error.response.data});
            } else {
                setMessage({errors: "Đã xảy ra lỗi không xác định."});
            }
        }

    }

    return (
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto mt-24">
            <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Xác nhận OTP</h2>
                <p className="text-md md:text-xl">Nhập otp chúng tôi vừa gửi cho bạn.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col max-w-md space-y-5">
                    <input
                        type="text"
                        placeholder="otp"
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                        onChange={handleChange}
                    />
                    <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                        Xác nhận
                    </button>
                </div>
            </form>
            <Link className='text-blue-700 decoration-2 hover:underline text-center' to="/forgotPassword">Quay lại</Link>
            {message.success && <p className='text-green-700'>{message.success}</p>}
            {message.errors && <p className='text-red-700'>{message.errors}</p>}
        </div>

    )
}
