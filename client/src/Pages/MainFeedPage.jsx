import { useAuth } from "../context/AuthContext.jsx";
import React, { useEffect, useState } from "react";
import { getAllPosts, getPostImageUrl, customerProfilePictureUrl } from "../services/client.js";
import { Link } from "react-router-dom";

export default function MainFeedPage() {
    const { customer } = useAuth();
    const customerId = customer?.id;
    const profileImage = customerId ? customerProfilePictureUrl(customerId) : null;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postImages, setPostImages] = useState({});


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts(); // Fetch all posts
                setPosts(data.reverse());

                // Fetch image URLs for each post
                const images = {};
                for (const post of data) {
                    if (post.postImageId) {
                        const imageUrl = await getPostImageUrl(post.customerId, post.id, post.postImageId);
                        images[post.id] = imageUrl;
                    }
                }
                setPostImages(images);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [customerId]);

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div className="bg-mainGray min-h-screen flex justify-center grow">


            {/* Display posts */}
            <div className="posts-container mt-8">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id}
                             className="post bg-white rounded-lg shadow-lg mb-8 min-h-[816px] max-w-[470px]">
                            <div className="p-2 flex items-center mb-1">
                                {/* Display customer profile image */}
                                {post.customerProfileImageId && (
                                    <img
                                        src={customerProfilePictureUrl(post.customerId)}
                                        alt="Customer Profile"
                                        className="h-10 w-10 rounded-full mr-4"
                                    />
                                )}
                                {/* Display customer name */}
                                <Link to={`/publicprofile/${post.customerId}`}
                                      className="text-lg font-bold">{post.customerName}</Link>
                            </div>

                            {/* Display post caption */}

                            {/* Display post image */}
                            {post.postImageId && postImages[post.id] && (
                                <img
                                    src={postImages[post.id]}
                                    alt="Post"
                                    className="min-h-[600px] bg-black mt-2 w-full object-contain"
                                />
                            )}
                            <p className="p-4"><b>{post.customerName}</b> {post.caption}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>

           =
        </div>
    );
}
