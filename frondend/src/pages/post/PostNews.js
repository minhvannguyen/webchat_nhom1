import React from 'react';

const PostNews = ({ isOpen, Close, onFileSelect }) => {
  if(!isOpen) return null; // Không hiển thị modal nếu không mở

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Chọn ảnh để tạo bài đăng</h2>
        <input
          type="file"
          accept="image/*" // Chỉ cho phép chọn ảnh
          onChange={onFileSelect}
          className="border rounded p-2 mb-4"
        />
        <div className="flex justify-center">
          <button onClick={Close} className="bg-blue-500 text-white px-4 py-2 rounded">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNews;
