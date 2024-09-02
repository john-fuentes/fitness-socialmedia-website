import { useAuth } from "../context/AuthContext.jsx";
import React, { useEffect, useState } from "react";
import { customerProfilePictureUrl, fetchCustomerPosts } from "../services/client.js";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const { customer } = useAuth();
    const customerId = customer?.id;
    const profileImage = customerId ? customerProfilePictureUrl(customerId) : null;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (customerId) {
                try {
                    const data = await fetchCustomerPosts(customerId);
                    setPosts(data);
                } catch (error) {
                    console.error("Error fetching posts:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [customerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-mainGray min-h-screen">
            <div className="py-10 flex justify-center items-center bg-mainGray">
                {profileImage && (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="h-56 w-56 object-cover rounded-full"
                    />
                )}
            </div>
            <div className="text-white text-4xl flex justify-center items-center bg-mainGray">
                {customer.name}
            </div>
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <h3>{post.caption}</h3>
                        {post.postImageId && (
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/images/${post.postImageId}`}
                                alt="Post"
                                className="post-image"
                            />
                        )}
                    </div>
                ))}
            </div>
            <Link to="/post">
                Hello
            </Link>
        </div>
    );
}
