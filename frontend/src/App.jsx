// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider} from "./contexts/DataContext";
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AuthenticatedRoute />} />
              {/* Other routes */}
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

// This component decides whether to show Home or Login
const AuthenticatedRoute = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-3xl bg-slate-300 font-bold text-gray-700">
        <div>Authorizing...</div>
        <div className="text-sm font-semibold">
          Free instance server will spin down with inactivity, which can delay
          requests by 50 seconds or more.
        </div>
      </div>
    );
  }

  return !auth ? <Login /> : <Home />;
};

export default App;
