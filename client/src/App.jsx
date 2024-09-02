import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WebHeader from './WebHeader.jsx'; // Adjust path as necessary
import AuthProvider from './context/AuthContext.jsx'; // Adjust path as necessary
 // Example page
 // Example page
import LoginPage from './Pages/LoginPage.jsx';
import HomePage from "./Pages/HomePage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import MainFeedPage from "./Pages/MainFeedPage.jsx";

import AccountSettings from "./Pages/AccountSettings.jsx";
import CreatePostForm from "./Pages/CreatePostForm.jsx"; // Example page

function App() {
  return (
      <AuthProvider>
        <WebHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/mainfeedpage" element={<MainFeedPage />}/>
            <Route path="/settings/:username" element={<AccountSettings/>}/>
            <Route path="/post" element={<CreatePostForm/>}/>
        </Routes>
      </AuthProvider>
  );
}

export default App;
