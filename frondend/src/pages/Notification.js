import React from 'react'
import NavBar from './NavBar'
import { FaTimes } from 'react-icons/fa'

export default function Notification({ isOpen, Close}) {

    if(!isOpen) return null;
    return (
        
                <div className="lg:max-w-[400px] h-5/6  overflow-y-auto fixed top-14 right-96 z-50">
                    <div className="w-full mx-auto bg-white border shadow-sm md:p-2 sm:max-w-xl dark:bg-gray-800 rounded-xl">
                        <div className="flex-col items-center justify-between w-full mb-8 sm:inline-flex">
                            <div className='flex'>
                            <h3 className=" text-xl font-bold text-gray-800 sm:text-2xl dark:text-white">
                                Thông báo
                            </h3>   
                            <FaTimes className="w-5 h-5 text-blue-600  hover:text-red-600 cursor-pointer ml-52 " type='button' onClick={Close}/>
                            </div>
                            <a
                                href="#"
                                className=" inline-flex items-center px-2 py-2 text-xs font-small text-indigo-500 sm:text-sm sm:px-3 hover:text-indigo-900 dark:text-gray-200 dark:hover:text-gray-100 mr-52"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
                                </svg>
                                Đã đọc hết!
                            </a>
                        </div>
                        <ul className="flex flex-col w-full divide-y">
                            <li className="flex flex-row">
                                <div className="flex items-center flex-1 p-4 text-sm cursor-pointer select-none hover:bg-gray-50">
                                    <div className="flex flex-col items-center justify-center w-10 h-5 mr-4">
                                        <a href="#" className="relative block">
                                            <img
                                                alt="profil"
                                                src="https://images.pexels.com/photos/7571856/pexels-photo-7571856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                className="object-cover w-10 h-10 mx-auto rounded-full"
                                            />
                                        </a>
                                    </div>
                                    <div className="flex-1 pl-1 mr-16">
                                        <div className="mb-1 font-semibold dark:text-white">
                                            @frankiesullvian <span className="font-normal">followed you</span>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            Thursday 4:20pm
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <div className="w-2 h-2 mb-4 bg-indigo-500 rounded-full" />
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            2 hours ago
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="flex flex-col">
                                <div className="flex items-center flex-1 p-4 text-sm cursor-pointer select-none hover:bg-gray-50">
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <a href="#" className="relative block">
                                            <img
                                                alt="profil"
                                                src="https://images.pexels.com/photos/698532/pexels-photo-698532.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                className="object-cover w-10 h-10 mx-auto rounded-full"
                                            />
                                        </a>
                                    </div>
                                    <div className="flex-1 pl-1 mr-16">
                                        <div className="mb-1 font-semibold dark:text-white">
                                            @elanor_mac{" "}
                                            <span className="font-normal">comment on your post</span>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            Thursday 3:12pm
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <div className="w-2 h-2 mb-4 bg-indigo-500 rounded-full" />
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            3 hours ago
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 mb-4 ml-16 mr-1 bg-gray-100 rounded-md">
                                    <p className="text-xs font-normal text-gray-600">
                                        "Love the background on this! Would love to learn how you created
                                        the mesh gradient effect."
                                    </p>
                                </div>
                            </li>
                            <li className="flex flex-row">
                                <div className="flex items-center flex-1 p-4 text-sm cursor-pointer select-none hover:bg-gray-50">
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <a href="#" className="relative block">
                                            <img
                                                alt="profil"
                                                src="https://images.pexels.com/photos/698532/pexels-photo-698532.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                className="object-cover w-10 h-10 mx-auto rounded-full"
                                            />
                                        </a>
                                    </div>
                                    <div className="flex-1 pl-1 mr-16">
                                        <div className="mb-1 font-semibold dark:text-white">
                                            @elanor_mac <span className="font-normal">like your post</span>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            Thursday 3:11pm
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <div className="w-2 h-2 mb-4 bg-indigo-500 rounded-full" />
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            3 hours ago
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="flex flex-row">
                                <div className="flex items-center flex-1 p-4 text-sm cursor-pointer select-none hover:bg-gray-50">
                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <a href="#" className="relative block">
                                            <img
                                                alt="profil"
                                                src="https://images.pexels.com/photos/7562139/pexels-photo-7562139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                className="object-cover w-10 h-10 mx-auto rounded-full"
                                            />
                                        </a>
                                    </div>
                                    <div className="flex-1 pl-1 mr-16">
                                        <div className="mb-1 font-semibold dark:text-white">
                                            @ollie_diggs <span className="font-normal">invite you to</span>
                                            Awesome Dashboard
                                        </div>
                                        <div className="mb-2 text-xs text-gray-600 dark:text-gray-200">
                                            Thursday 2:44pm
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="px-2 py-1 text-xs font-medium border border-gray-400 rounded-md">
                                                Decline
                                            </button>
                                            <button className="px-2 py-1 text-xs font-medium bg-indigo-500 rounded-md text-gray-50">
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end">
                                        <div className="w-2 h-2 mb-4 bg-indigo-500 rounded-full" />
                                        <div className="text-xs text-gray-600 dark:text-gray-200">
                                            4 hours ago
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
        

    )
}
