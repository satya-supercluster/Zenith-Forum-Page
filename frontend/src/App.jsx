// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider,useAuth } from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AuthenticatedRoute />} />
            {/* Other routes */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// This component decides whether to show Home or Login
const AuthenticatedRoute = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return !auth ? <Login /> : <Home />;
};

export default App;
