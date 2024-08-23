//this will be the homepage maybe introducing myself and explaining the point of the project
//this project will be about keeping track of leetcode questions you've completed
//probably add a calendar so you see the days, the days will list the questions you've completed
//or no calendar have day 1 start when you start, and then when you click on the day you open a page that
//displays the questions where you can then add notes on the questions
//don't forget to use yarn add react-router-dom
//Could add profilepage, feedpage, create new post page
//Maybe in the future add a food tracking part, or even ai chat for suggestions

import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";


//could pre display
export default function HomePage() {
    const {customer} = useAuth();
    const customerId = customer?.id;


  return (
    <div className="justify-center items-center py-20 bg-mainGray text-white min-h-screen text-center">
      <div className="mt-4">
        <h1 className="text-4xl mb-6">Welcome to FitBook</h1>
        <p className="text-gray-300 mb-4">Share your fitness journey</p>
        <Link to={"/register"} className="bg-primary py-2 px-6 max-w-xs text-center rounded-full">
          sign up
        </Link>
      </div>
      <div className="mt-20">
          <p>You can share your progress and accomplishments with others</p>
      </div>
    </div>
  );
}
