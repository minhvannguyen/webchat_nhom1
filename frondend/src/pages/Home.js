import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Posts from './post/Posts';
import NavBar from './NavBar';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

export default function Home() {

    const token = localStorage.getItem("token");

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Thêm isLoading để theo dõi trạng thái tải

    
    
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/posts/recent?page=${page}&size=10`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newPosts = response.data.content; // Giả sử dữ liệu trả về trong `content`
            
            // Đảm bảo rằng mỗi bài viết trong `newPosts` có đúng cấu trúc giống `postData`
            const formattedPosts = newPosts.map(post => ({
                idPost: post.idPost,
                imageUrl: post.imageUrl,
                content: post.content,
                date: post.date,
                avatar: post.avatar,
                userName: post.userName
            }));
    
            // Cập nhật state với dữ liệu bài viết đã được format
            setPosts((prevPosts) => [...prevPosts, ...formattedPosts]);
    
            // Kiểm tra xem có còn dữ liệu nữa không
            setHasMore(!response.data.last);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false); // Khi tải xong, cập nhật trạng thái
        }
    };
    

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const loadMorePosts = () => {
        if (!isLoading) { // Chỉ tăng trang khi không tải
            setPage((prevPage) => prevPage + 1);
        }
    };
      
      return (
        <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={isLoading && <h4>Đang tải...</h4>} // Hiển thị "Đang tải..." khi isLoading = true            endMessage={<p>No more posts</p>}
        >
            <div className="flex justify-center items-center h-screen">
                <div className="w-full h-full lg:max-w-[450px] bg-transparent shadow-lg">
                    <NavBar />
                    {posts.map((post) => (
                        <div key={post.idPost}>
                            <Posts postData={post} /> {/* Truyền `postData` cho component `Posts` */}
                        </div>
                    ))}
                </div>
            </div>
        </InfiniteScroll>
    );
}