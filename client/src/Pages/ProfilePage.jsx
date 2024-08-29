import {useAuth} from "../context/AuthContext.jsx";
import React from "react";
import {customerProfilePictureUrl} from "../services/client.js";
import {Link} from "react-router-dom";

export default function ProfilePage(){
const {customer} = useAuth();
const customerId = customer?.id;
const profileImage = customerId ? customerProfilePictureUrl(customerId) : null;
    return(
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
            <Link to="/post">
                Hello
            </Link>
        </div>
    )
}
