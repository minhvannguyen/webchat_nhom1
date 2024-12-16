import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/sign/Register'; 
import Login from './pages/sign/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/sign/ForgotPassword';
import ConfirmOtp from './pages/sign/ConfirmOtp';
import ChangePassword from './pages/sign/ChangePassword';
import ProfilePage from './pages/profile/ProfilePage';
import UpdateProfile from './pages/profile/UpdateProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSclient from './pages/profile/ProfileSclient';


function App() {
  return (
    <>
    <ToastContainer position="bottom-center" autoClose={2000} style={{ marginBottom: '250px' }} />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/confirmOtp" element={<ConfirmOtp />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/profileClient" element={<ProfileSclient />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
