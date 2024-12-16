import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import MessegerChat from './MessegerChat';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import ConversationItem from './ConversationItem';

export default function Messeger({ isOpen, Close }) {

  //logic chat
  const [isOpenChat, setIsOpenChat] = useState(false);
  const openChat = () => {
    setIsOpenChat(true);
  };
  const closeChat = () => {
    setIsOpenChat(false);
  };
  //kết thúc logic chat

  //logic conversation
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchConversations = async (currentPage) => {
    try {
      const response = await axios.get('http://localhost:8080/allConversation', {
        params: {
          userId: localStorage.getItem("id"),
          page: currentPage,
          size: 20,
        },
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        });

      const { content, totalPages } = response.data;

      // Cập nhật danh sách cuộc hội thoại
      setConversations((prev) => [...prev, ...content]);

      // Xác định nếu đã tải hết dữ liệu
      if (currentPage >= totalPages - 1) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  useEffect(() => {
    fetchConversations(page);
  }, [page]);

  if (!isOpen) return null;
  return (
    <>
      {/* component */}
      <div className="w-full h-full lg:max-w-[320px] overflow-hidden fixed top-1 left-0">
        {/* Sidebar */}
        <div className=" bg-gray-300 border-r border-gray-1000">
          {/* Sidebar Header */}
          <header className="p-3 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Hàn huyên</h1>
            <div >

              <FaTimes className="w-5 h-5 text-red-600 hover:text-blue-600 cursor-pointer" onClick={Close} />
            </div>
          </header>
          {/* Contact List */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20" >
            <MessegerChat
              isOpenChat={isOpenChat}
              OpenChat={openChat}
              CloseChat={closeChat}
            />
            <InfiniteScroll
              dataLength={conversations.length}
              next={() => setPage((prev) => prev + 1)}
              hasMore={hasMore}
              endMessage={<p>No more conversations</p>}
            >
              {conversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
            </InfiniteScroll>

          </div>
        </div>
      </div>
    </>

  )
}
