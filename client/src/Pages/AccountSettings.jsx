import { useAuth } from "../context/AuthContext.jsx";
import Dropzone from 'react-dropzone';
import { customerProfilePictureUrl, uploadCustomerProfilePicture, updateCustomer } from "../services/client.js";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AccountSettings() {
    const { logOut, customer } = useAuth();
    const customerId = customer?.id;
    const profileImage = customerId ? customerProfilePictureUrl(customerId) : null;
    const [age, setAge] = useState(customer?.age || '');
    const [name, setName] = useState(customer?.name || '');
    const [username, setUsername] = useState(customer?.username || '');
    const [redirect, setRedirect] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function updateUserInfo(ev) {
        ev.preventDefault();

        const updatedCustomer = {
            name,
            age,
            username
        };

        try {
            await updateCustomer(customerId, updatedCustomer);
            setSuccessMessage('Profile updated successfully! Refresh to see changes');
        } catch (error) {
            setErrorMessage('Error updating profile');
        }
    }

    // Handle profile picture upload
    const handleProfilePictureUpload = (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]); // Get the first file
            uploadCustomerProfilePicture(customerId, formData)
                .then(() => setSuccessMessage('Profile picture updated successfully! Refresh to see changes'))
                .catch(() => setErrorMessage('Error uploading profile picture'));

    };

    const handleLogout = () => {
        logOut();
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="justify-center items-center text-center bg-mainGray text-white min-h-screen">
            <div className="flex items-center justify-center py-10">
                {profileImage && (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="h-56 w-56 object-cover rounded-full"
                    />
                )}
            </div>
            <Dropzone onDrop={handleProfilePictureUpload}>
                {({ getRootProps, getInputProps }) => (
                    <section className="flex items-center justify-center">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="border py-2 px-6 max-w-xs text-center rounded-full cursor-pointer">
                                Drag and drop, or click to select profile picture
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
            <div className="max-w-md mx-auto text-black my-5">
                <h1 className="text-2xl font-bold text-white">User Information</h1>
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <form onSubmit={updateUserInfo}>
                    <h2 className="text-white mt-2">Email</h2>
                    <input
                        type="text"
                        value={username}
                        placeholder={customer?.username}
                        onChange={ev => setUsername(ev.target.value)}
                        className="w-full p-2 mt-2 text-black"
                    />
                    <h2 className="text-white mt-2">Name</h2>
                    <input
                        type="text"
                        value={name}
                        placeholder={customer?.name}
                        onChange={ev => setName(ev.target.value)}
                        className="w-full p-2 mt-2 text-black"
                    />
                    <h2 className="text-white mt-2">Age</h2>
                    <input
                        type="number"
                        value={age}
                        placeholder={customer?.age}
                        onChange={ev => setAge(ev.target.value)}
                        className="w-full p-2 mt-2 text-black"
                    />
                    <button type="submit" className="primary mt-6 bg-blue-500 text-white py-2 px-4 rounded-full">
                        Update info
                    </button>
                </form>
                <button className="primary mt-6 bg-red-500 text-white py-2 px-4 rounded-full" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}