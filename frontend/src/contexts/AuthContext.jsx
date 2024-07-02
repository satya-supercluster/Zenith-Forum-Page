// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase-config.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [token, setToken] = useState(null);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const userLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      if (result.user) {
        const createdToken = await result.user.getIdToken();
        console.log(createdToken);
        const res = await fetch(`${import.meta.env.VITE_SITE}/api/auth/google`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${createdToken}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(await res.text());
        if (!res.ok) {
          setAuth(false);
          setSigning(false);
          setToken(null);
          setUser(null);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setAuth(true);
        setToken(createdToken);
        setSigning(false);
        setUser(data.user);
        console.log(data.user);
        } else {
        setAuth(false);
        setToken(null);
        setSigning(false);
        setUser(null);
        console.log("No user from Google Sign-In");
      }
    } catch (error) {
      console.error("Failed to Authenticate:", error);
      setAuth(false);
      setToken(null);
      setSigning(false);
      setUser(null);
    }
  };

  const logout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        setAuth(false);
        setUser(null);
        setToken(null);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in.
        firebaseUser.getIdToken().then((newToken) => {
          setToken(newToken);
          fetch(`${import.meta.env.VITE_SITE}/api/auth/google`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setAuth(true);
              setUser(data.user);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              setAuth(false);
              setToken(null);
              setUser(null);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        // User is signed out.
        setAuth(false);
        setUser(null);
        setToken(null);
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, user, isLoading, token, userLoginWithGoogle, logout, signing, setSigning }}
    >
      {children}
    </AuthContext.Provider>
  );
};
