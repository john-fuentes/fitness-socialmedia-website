import { Link } from "react-router-dom";
import AuthContext, { useAuth } from "./context/AuthContext";
import React, { useContext, useState } from "react";
import {customerProfilePictureUrl} from "./services/client.js"; // Adjust the path as needed

export default function WebHeader() {
    const { customer } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const customerId = customer?.id;
    const profileImage = customerProfilePictureUrl(customerId);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="flex justify-between bg-black">
            <Link to="/" className="mx-2 text-primary flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                </svg>
                <span className="text-white text-xl text-bold">fitBook</span>
            </Link>
            {customer ? (
                <div className="relative bg-black">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center bg-black rounded-full border border-white text-white gap-2 py-2 px-4 my-2"
                    >
                        <div>{customer.name}</div>
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="h-8 w-8 object-cover rounded-full"
                        />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link
                                to={`/profile/${customer.username}`}
                                className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                                Profile Page
                            </Link>
                            <Link
                                to={`/settings/${customer.username}`}
                                className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                                Settings
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className="flex items-center rounded-full border border-white text-white gap-2 py-2 px-4 my-2">
                    <div>sign in</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                </Link>
            )}
        </header>
    );
}
