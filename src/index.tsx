import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/authContext";
import bcrypt from "bcryptjs";

import "../src/styles/index.scss";

import Home from "./pages/landingpage/home";
import SignUp from "./pages/signUp/signUp";
import LogIn from "./pages/logIn/logIn";
import UserProfile from "./pages/userProfile/userProfile";
import Admin from "./pages/adminProfile/adminProfile";
import Menu from "./pages/menu/menu";
import Error from "./pages/error/error";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const createAdminUser = async () => {
  const adminEmail = "admin@foodly.com";
  const adminPassword = "admin";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = {
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  };

  if (!localStorage.getItem("user_admin")) {
    localStorage.setItem("user_admin", JSON.stringify(adminUser));
  }
};

createAdminUser();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/myinfo" element={<UserProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
