import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
// import Registration from "./Registration";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import RegistrationList from "./RegistrationList";
import ArticleList from "./ArticleList";
import News from "./News";
import Staff from "./Staff";
import UserArticle from "./UserArticle";
import MyNews from "./MyNews";

const Registration = lazy(() => import("./Registration"));

export default function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/registrationlist" element={<RegistrationList />} />
        <Route path="/articleList" element={<ArticleList />} />
        <Route path="/news" element={<News />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/userArticle" element={<UserArticle />} />
        <Route path="/myNews" element={<MyNews />} />
      </Routes>
    </Router>
  );
}
