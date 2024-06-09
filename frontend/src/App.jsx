// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./config/firebase.config.js";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
function App() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      if (result.user) {
        const token = await result.user.getIdToken();
        console.log(token);
        const res = await fetch("http://localhost:8080/api/auth/google", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        // Store user data and auth state in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");

        setAuth(true);
      } else {
        setAuth(false);
        console.log("No user from Google Sign-In");
        clearLocalStorage();
      }
    } catch (error) {
      console.error("Failed to Authenticate:", error);
      setAuth(false);
      clearLocalStorage();
    }
  };

  // Helper function to clear localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
  };

  // Function to check authentication status on app load or component mount
  const checkAuthStatus = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (isAuthenticated && user && token) {
      setAuth(true);
      // You can also set user data in your app state or context here
      console.log("User is authenticated:", user.name);
      return true;
    } else {
      setAuth(false);
      clearLocalStorage(); // Clear any leftover data
      console.log("User is not authenticated");
      return false;
    }
  };

  useEffect(() => {
    clearLocalStorage();
    const checkAuth = async () => {
      const authStatus = checkAuthStatus();
      setAuth(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);



  const [user, setUser] = useState(null);
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
      console.log(user);
    }
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route
            index
            element={!auth ? <Login signIn={userLoginWithGoogle} /> : <Home />}
          />
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
