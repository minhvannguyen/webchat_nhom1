import axios from 'axios';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function CmtComponent({ cmt, refresh }) {
     
    const token = localStorage.getItem("token");

    const handleDelCmt = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8080/comment/delComment/${cmt.idComent}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        refresh();
      };

    return (
        <div>
            <div className="w-[1000px] flex-col justify-start items-start gap-8 flex transform translate-x-11">
                <div className="w-full flex-col justify-start items-end gap-5 flex">
                    <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                        <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                            <div className="w-full justify-between items-center inline-flex">
                                <div className="justify-start items-center gap-2.5 flex">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                                        <img
                                            className="rounded-full object-cover"
                                            src={cmt.userAvatar}
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                                        <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                                            {cmt.username}
                                        </h5>

                                    </div>
                                </div>
                                <div className="w-6 h-6 relative">

                                </div>
                            </div>
                            <p className="text-gray-800 text-sm font-normal leading-snug">
                                {cmt.content}
                            </p>
                        </div>
                        <div className="w-full justify-between items-center inline-flex">
                            <div className="justify-start items-center gap-4 flex">
                                <div className="justify-start items-center gap-1.5 flex">
                                    <a href="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            onClick={handleDelCmt}
                                        >
                                            <path
                                                d="M5 7H19M10 11V17M14 11V17M7 7L8 20.5C8.08333 21.3333 8.5 22 9.5 22H14.5C15.5 22 15.9167 21.3333 16 20.5L17 7M9 4H15C15.8284 4 16.5 4.67157 16.5 5.5V6.5H7.5V5.5C7.5 4.67157 8.17157 4 9 4Z"
                                                stroke="black"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                    <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                        Delete
                                    </h5>
                                </div>
                                <div className="justify-start items-center gap-1.5 flex">
                                    <a href="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z"
                                                stroke="black"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </a>
                                    <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                        2 Replies
                                    </h5>
                                </div>
                                <div className="justify-start items-center gap-1.5 flex">
                                    <a href="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z"
                                                stroke="#111827"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </a>
                                    <h5 className="text-gray-900 text-sm font-normal leading-snug">
                                        Reactions
                                    </h5>
                                </div>
                            </div>
                            <div className="justify-end items-center gap-1 flex">
                                <h5 className="text-gray-500 text-sm font-normal leading-snug">
                                    30
                                </h5>
                                <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                                        <img
                                            className="w-3 h-3"
                                            src="https://pagedone.io/asset/uploads/1716545141.png"
                                            alt="Thumbs Up emoji"
                                        />
                                    </div>
                                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                                        <img
                                            className="w-3 h-3"
                                            src="https://pagedone.io/asset/uploads/1716545183.png"
                                            alt="Smiling eyes emoji"
                                        />
                                    </div>
                                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                                        <img
                                            className="w-3 h-3"
                                            src="https://pagedone.io/asset/uploads/1716545217.png"
                                            alt="hugging face emoji"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
