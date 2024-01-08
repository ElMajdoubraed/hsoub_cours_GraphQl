import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import SignUpPage from "./pages/SignUp";
import AuthContext from "./context/auth-context";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  let [token, setToken] = useState(localStorage.getItem("token") || "");
  let [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  let [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const login: any = (
    userToken: string | null,
    loginUserId: string | null,
    username: string | null
  ) => {
    if (userToken) {
      setToken(userToken);
      localStorage.setItem("token", userToken);
    }
    if (loginUserId) {
      setUserId(loginUserId);
      localStorage.setItem("userId", loginUserId);
    }
    if (username) {
      setUsername(username);
      localStorage.setItem("username", username);
    }
  };

  const logout = () => {
    setToken(null as any);
    setUserId(null as any);
    setUsername(null as any);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, userId, username, login, logout }}>
        <Navbar />
        <main className="main-content">
          <Routes>
            {token && (
              <Route
                path="/login"
                element={<Navigate replace to="/events" />}
              />
            )}
            <Route path="/login" element={<LoginPage />} />
            {token && (
              <Route
                path="/signup"
                element={<Navigate replace to="/events" />}
              />
            )}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<Navigate replace to="/events" />} />
            <Route path="/events" element={<EventsPage />} />

            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <BookingsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
