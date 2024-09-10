import { useAuth } from "../context/AuthContext.jsx";
import React, { useEffect, useState } from "react";
import { customerProfilePictureUrl, fetchCustomerPosts, getPostImageUrl } from "../services/client.js";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const { customer } = useAuth();
    const customerId = customer?.id;
    const profileImage = customerId ? customerProfilePictureUrl(customerId) : null;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postImages, setPostImages] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            if (customerId) {
                try {
                    const data = await fetchCustomerPosts(customerId);
                    setPosts(data.reverse());

                    // Fetch image URLs for each post
                    const images = {};
                    for (const post of data) {
                        if (post.postImageId) {
                            const imageUrl = await getPostImageUrl(customerId, post.id, post.postImageId);
                            images[post.id] = imageUrl;
                        }
                    }
                    setPostImages(images);
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
        <div className="bg-mainGray min-h-screen flex flex-col items-center">
            {/* Profile Image */}
            <div className="py-10 bg-mainGray">
                {profileImage? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="h-56 w-56 object-cover rounded-full"
                    />
                ) : (<Link to={`/settings/${customer.username}`}>
                        <div className="h-56 w-56 object-cover rounded-full border flex justify-center items-center text-white">
                            Upload a profile image!
                        </div>

                        </Link>

                    )}
            </div>
            <div className="text-white text-4xl bg-mainGray mb-6">
                {customer.name}
            </div>

            <Link to="/post" className="bg-primary py-2 px-6 max-w-xs text-center rounded-full">
                Add New Post
            </Link>

            {/* Display posts with similar styling as MainFeedPage */}
            <div className="posts-container mt-4">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post bg-white rounded-lg shadow-lg mb-4 min-h-[816px] max-w-[470px]">
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
                                <h3 className="text-lg font-bold">{post.customerName}</h3>
                            </div>

                            {/* Display post image */}
                            {post.postImageId && postImages[post.id] && (
                                <img
                                    src={postImages[post.id]}
                                    alt="Post"
                                    className="min-h-[600px] bg-black mt-2 w-full object-contain"
                                />
                            )}
                            <p className="p-4">{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <h1 className="text-white text-lg my-4">Create your first post!</h1>
                )}
            </div>
        </div>
    );
}
