import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customerProfilePictureUrl, fetchCustomerPosts, getPostImageUrl } from "../services/client.js";

export default function PublicProfilePage() {
    const { customerId } = useParams(); // Get customerId from URL
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postImages, setPostImages] = useState({});
    const [error, setError] = useState(null); // Add error handling

    // Fetch customer data and posts when component mounts
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const postData = await fetchCustomerPosts(customerId); // Fetch posts for this customer
                setPosts(postData.reverse());

                // Fetch image URLs for each post
                const images = {};
                for (const post of postData) {
                    if (post.postImageId) {
                        const imageUrl = await getPostImageUrl(customerId, post.id, post.postImageId);
                        images[post.id] = imageUrl;
                    }
                }
                setPostImages(images);
            } catch (error) {
                console.error("Error fetching customer data or posts:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [customerId]); // Re-run when customerId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Extract customer info from the first post
    const firstPost = posts.length > 0 ? posts[0] : null;
    const customerProfileImage = firstPost ? customerProfilePictureUrl(firstPost.customerId) : null;
    const customerName = firstPost ? firstPost.customerName : null;

    return (
        <div className="bg-mainGray min-h-screen flex flex-col items-center">
            {/* Display the profile image and customer name at the top */}
            <div className="py-10 bg-mainGray">
                {customerProfileImage && (
                    <img
                        src={customerProfileImage}
                        alt="Profile"
                        className="h-56 w-56 object-cover rounded-full"
                    />
                )}
            </div>
            <div className="text-white text-4xl bg-mainGray mb-4">
                {customerName || "Profile"}
            </div>

            {/* Display posts with similar styling as MainFeedPage */}
            <div className="posts-container mt-4">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post bg-white rounded-lg shadow-lg mb-4 min-h-[816px] max-w-[470px]">
                            <div className="p-2 flex items-center mb-1">
                                {post.customerProfileImageId && (
                                    <img
                                        src={customerProfilePictureUrl(post.customerId)}
                                        alt="Customer Profile"
                                        className="h-10 w-10 rounded-full mr-4"
                                    />
                                )}
                                <h3 className="text-lg font-bold">{post.customerName}</h3>
                            </div>

                            {post.postImageId && postImages[post.id] && (
                                <img
                                    src={postImages[post.id]}
                                    alt="Post"
                                    className="min-h-[600px] bg-black mt-2 w-full object-contain"
                                />
                            )}
                            <p className="p-4"><b>{post.customerName}</b>   {post.caption}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
}
