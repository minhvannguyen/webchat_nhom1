import React, { useEffect, useState } from "react";
import axios from "axios";
import PostDetail from "../post/postDetail";


function UserPhotos({ idUser, numberPost }) {

  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Thiết lập headers kèm theo token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Gọi API lấy danh sách ảnh với token
    axios
      .get(`http://localhost:8080/posts/allPost/${idUser}`, config,

      )
      .then(response => setPhotos(response.data))
      .catch(error => console.error("Lỗi khi lấy ảnh:", error));
  }, [idUser]);

  numberPost(photos.length);

  //logic thông báo
  const [isOpenPost, setIsOpenPost] = useState(false);
  const OpenPost = () => {
    setIsOpenPost(true);
  };
  const closePost = () => {
    setIsOpenPost(false);
  };
  //kết thúc logic thông báo

  //truyền dữ liệu qua postDetail
  const [postData, setPostData] = useState({
    idPost: '',
    imageUrl: '',
    content: '',
    date: '',
    likeNumbers: 0,
    commentNumbers: 0,
  });
  const handleImageClick = (photo) => {
    setIsOpenPost(true);
    setPostData({
      idPost: photo.idPost,
      imageUrl: photo.imageUrl,
      content: photo.content,
      date: photo.date,
      commentNumbers: photo.commentNumbers,
      likeNumbers: photo.likeNumbers,
    });
    OpenPost(); // Nếu bạn muốn mở post sau khi cập nhật dữ liệu
  };
  return (
    <>
      <PostDetail
        isOpen={isOpenPost}
        Open={OpenPost}
        Close={closePost}
        postData={postData}
      />
      <div className="photo-gallery grid grid-cols-3 gap-4 bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg">
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.imageUrl}
            alt="Ảnh đã đăng"
            className="user-photo w-full h-full object-contain"
            onClick={() => handleImageClick(photo)}


          />
        ))}
      </div>
    </>
  );
}

export default UserPhotos;
