import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import FollowComponent from './FollowComponent';
import axios from 'axios';

export default function Follower({ IsOpenFollower, Close}) {

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/follow/allFollower/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => setFollowers(response.data))
      .catch(error => console.error("Error fetching followers:", error));
  }, [id, token]);

  if(!IsOpenFollower) return null;
  return (
    <>
  {/* component */}
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");\n    body{\n        font-family: "Roboto", sans-serif;\n    }\n'
    }}
  />
  {/* This is an example component */}
  <div className="fixed overflow-y-auto inset-0 bg-opacity-50 z-50 flex flex-col items-center justify-center min-h-screen">
    <div className="user-list mt-56 w-full lg:max-w-[400px] mx-auto bg-gray-300 rounded-xl shadow-xl flex flex-col py-4">
    <FaTimes className="w-5 h-5 text-blue-600  hover:text-red-600 cursor-pointer ml-2.5" onClick={Close}/>
    <ul>
        {followers.map(follower => (
          <FollowComponent user = {follower}/>
        ))}
      </ul>
      
      
      <a
        className="show-more block w-10/12 mx-auto py-2.5 px-4 text-center no-underline rounded hover:bg-[#f6f8f9] font-medium duration-300"
        href="#/"
      >
        Show more members
      </a>
    </div>
  </div>
</>

  )
}
