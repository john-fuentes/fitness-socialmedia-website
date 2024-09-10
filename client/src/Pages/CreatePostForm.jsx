import React, { useState } from 'react';
import { createPost } from '../services/client';
import { useAuth } from "../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

const CreatePostForm = () => {
    const {customer} = useAuth();
    const customerId = customer?.id;
    const [caption, setCaption] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPostImage(file);
        // Set selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Set the preview image URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            setPreviewImage(null); // Clear the preview if no file is selected
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            await createPost(caption, postImage); // Pass customerId
            alert("Post created successfully");
            setRedirect(true);
        } catch (error) {
            console.error("Error creating post", error);
            alert("Error creating post");
        }
    };

    if(redirect){
        return <Navigate to="/profile/:username"/>
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-mainGray text-white">
            <form className="max-w-md mt-20 flex flex-col items-center " onSubmit={handleSubmit}>
                <label htmlFor="postImage">Post Image</label>
                <input
                    type="file"
                    id="postImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                {previewImage && (
                    <div className="mt-4">
                        <img
                            src={previewImage}
                            alt="Image Preview"
                            className="w-64 h-64 object-contain"
                        />
                    </div>
                )}


                <input
                    placeholder="Caption"
                    className="text-black"
                    type="text"
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                />

                <button className="primary mt-1" type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePostForm;
