import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios';
import config from './config';

const clientId = config.CLIENT_ID;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [authRequest, setAuthRequest] = useState({ gmail: '', password: '' });
  const [message, setMessage] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', authRequest);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userDto.userName);
        localStorage.setItem('avatar', response.data.userDto.avatar);
        localStorage.setItem('id', response.data.userDto.id);
        localStorage.setItem('address', response.data.userDto.address);
        localStorage.setItem('bio', response.data.userDto.bio);
        localStorage.setItem('isSingle', response.data.userDto.isSingle);

        setMessage({ success: 'Đăng nhập thành công!' });
        navigate("/home")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage({ errors: error.response.data }); // Hiển thị thông báo lỗi từ backend
      } else {
        setMessage({ errors: 'Đã xảy ra lỗi, vui lòng thử lại!' });
      }
    }
  };

  const handleGoogleSuccess = async (response1) => {
    response1.preventDefault();

    const { tokenId } = response1; // Nhận token từ Google

    try {
      // Gửi token đến backend để xác thực và nhận thông tin người dùng
      const res = await axios.post('http://localhost:8080/oauth2/callback/google', {
        token: tokenId,
      });
      // Lưu trữ thông tin người dùng hoặc token trong localStorage/sessionStorage
      localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.userDto.userName);
        localStorage.setItem('avatar', res.data.userDto.avatar);
        localStorage.setItem('id', res.data.userDto.id);
        localStorage.setItem('address', res.data.userDto.address);
        localStorage.setItem('bio', res.data.userDto.bio);
        localStorage.setItem('isSingle', res.data.userDto.isSingle);

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleGoogleLogin = () => {
    // Mở cửa sổ đăng nhập Google
    window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=http://localhost:3000/home&response_type=code&scope=profile email&access_type=offline`, "_self");
  };

  return (
    <>
      {/* component */}
      <link
        rel="stylesheet"
        href="https://horizon-ui.com/shadcn-nextjs-boilerplate/_next/static/css/32144b924e2aa5af.css"
      />
      <div className="flex flex-col justify-center items-center bg-white h-[100vh]">
        <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
          <a className="mt-10 w-fit text-zinc-950 dark:text-white" href="/">
            <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 320 512"
                className="mr-3 h-[13px] w-[8px] text-zinc-950 dark:text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
              </svg>

            </div>
          </a>
          <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
            <p className="text-[32px] font-bold text-zinc-950 dark:text-white text-center">
              Đăng Nhập
            </p>

            <div className="mt-8">
              <form className="pb-2" onSubmit={handleGoogleSuccess}>
                <input type="hidden" name="provider" defaultValue="google" />
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-zinc-950 py-6 dark:text-white"
                  type="submit" onClick={handleGoogleLogin}
                >
                  <span className="mr-2">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 48 48"
                      enableBackground="new 0 0 48 48"
                      className="h-5 w-5"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </span>
                  <span>Google</span>
                </button>
              </form>
            </div>
            <div className="relative my-4">
              <div className="relative flex items-center py-1">
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
                <p>or</p>
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
              </div>
            </div>
            <div>

              <form noValidate="" className="mb-4" onSubmit={handleLogin}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <label
                      className="text-zinc-950 dark:text-white"
                      htmlFor="gmail"
                    >
                      Email
                    </label>
                    <input
                      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      name="gmail"
                      onChange={handleChange}

                    />
                    <label
                      className="text-zinc-950 mt-2 dark:text-white"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      id="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                      name="password"
                      value={authRequest.password}
                      onChange={handleChange}
                    />
                    <div className="flex items-center">
                      <input
                        id="show-password"
                        type="checkbox"
                        className="mr-2"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="show-password" className="text-sm">Hiển thị mật khẩu</label>
                    </div>
                  </div>
                  <button
                    className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              {message.errors && <p className='text-red-600'>{message.errors}</p>}
              {message.success && <p className='text-green-700'>{message.success}</p>}
              <p>
                <Link
                  href="/dashboard/signin/forgot_password"
                  className="text-blue-600 decoration-2 hover:underline"
                  to="/forgotPassword"
                >
                  Quên mật khẩu?
                </Link>
              </p>
              <div className='flex'>
                <div className='text-gray-500 mr-3'>Bạn chưa có tài khoản?</div>
                <Link className='text-blue-700 decoration-2 hover:underline' to="/register">Đăng ký thôi!</Link>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>

  )
}
