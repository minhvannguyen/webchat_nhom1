import React from 'react'

const ConversationItem = ({ conversation, openChat }) =>  {
  return (
    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={openChat}>
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img
              src="http://localhost:8080/uploads/images/1731635348355-images%20(8).jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Võ Nữ Thánh Hiền</h2>
            <p className="text-gray-600">vầng</p>
          </div>
        </div>
  )
}
export default ConversationItem;

