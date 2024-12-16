import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function FollowingComponent({user}) {
    const navigate = useNavigate();
    

    const handleClick = (e) => {
      navigate('/profileClient', {
      state: {
        userClient: user,
      }
     });
    };

return (
  <div>
      {/*User row */}
    <div className="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
      <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
        <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
          <img
            className="avatar w-20 h-20 rounded-full"
            src={user.avatar}
          />
        </div>
        <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
          <div className="title font-medium no-underline">
           {user.userName}
          </div>
          
        </div>
      </div>
      {/*Button content */}
      <div className="user-option mx-auto sm:ml-auto sm:mr-0">
        <button
          className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
          type="button"
          onClick={handleClick}
        >
          Following
        </button>
      </div>
      {/*Close Button content */}
    </div>
    {/*User row */}
  </div>
)
}

