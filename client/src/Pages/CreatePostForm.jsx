import React, { useState } from 'react';
import { createPost } from '../services/client';
import { useAuth } from "../context/AuthContext.jsx";

const CreatePostForm = () => {
    const { customer } = useAuth();
    const customerId = customer?.id;
    const [caption, setCaption] = useState('');
    const [postImage, setPostImage] = useState(null);

    const handleFileChange = (e) => {
        setPostImage(e.target.files[0]); // Set selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('file', postImage); // Correctly append the file

        try {
            await createPost(caption, postImage); // Ensure createPost matches the formData
            alert("Post created successfully");
        } catch (error) {
            console.error("Error creating post", error);
            alert("Error creating post");
        }
    };

    return (
        <form className="justify-center items-center bg-mainGray text-white min-h-screen " onSubmit={handleSubmit}>
            <div>
                <label htmlFor="caption">Caption</label>
                <input
                    type="text"
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="postImage">Post Image</label>
                <input
                    type="file"
                    id="postImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePostForm;
