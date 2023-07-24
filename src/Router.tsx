import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Projects from "./components/Projects";
import Employees from "./components/Employees";
import Feedbacks from "./components/Feedbacks";
import Login from "./components/Login";
import { useState, useCallback, useEffect } from "react";
import Auth from "./lib/auth";
import Index from "./components/Index";

export default function Router() {
  const navigate = useNavigate();
  const checkAuth = useCallback(async () => {
    const isLoggedIn = await Auth.isAuthenticated();
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    checkAuth();
    return;
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="projects" element={<Projects />} />
        <Route path="employees" element={<Employees />} />
        <Route path="feedbacks" element={<Feedbacks />} />
      </Route>
    </Routes>
  );
}
