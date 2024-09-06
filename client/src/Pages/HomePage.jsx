//this will be the homepage maybe introducing myself and explaining the point of the project
//this project will be about keeping track of leetcode questions you've completed
//probably add a calendar so you see the days, the days will list the questions you've completed
//or no calendar have day 1 start when you start, and then when you click on the day you open a page that
//displays the questions where you can then add notes on the questions
//don't forget to use yarn add react-router-dom
//Could add profilepage, feedpage, create new post page
//Maybe in the future add a food tracking part, or even ai chat for suggestions

import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";


//could pre display
export default function HomePage() {
    const {customer} = useAuth();
    const customerId = customer?.id;




  return (
      <div>
      {!customer ? (
    <div className="justify-center items-center py-20 bg-mainGray text-white min-h-screen text-center">

        <div className="mt-4">
            <h1 className="text-4xl mb-6">Welcome to FitBook</h1>
                <p>You can share your progress and accomplishments with </p>
                <p>a community of gym goers who wouldn't judge you and appreciate your dedication</p>
                <p>Hit a pr? Getting shredded for prep? Or just feel like you look good?</p>
                <p>Show off and post it!</p>
            <p className="text-gray-300 mt-20 mb-4">Share your fitness journey</p>
            <Link to={"/register"} className="bg-primary py-2 px-6 max-w-xs text-center rounded-full">
                sign up
            </Link>
        </div>
    </div>) : (
          <Navigate to={'/mainfeedpage'}/>
      )}
      </div>
  );
}
