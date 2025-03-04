// src/App.js
import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './layout/Layout'
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/SignUp";
import Home from "./components/Home/Home";
import { io } from "socket.io-client";
import { useData } from "./contexts/DataContext";
import { useAuth } from "./contexts/AuthContext";
import { Loader2 } from "lucide-react";
function App() {
  const {auth}=useAuth();
  const user=auth?.user;
  const {socket,setSocket,setLikeNotification,setOnlineUsers,refresh}=useData();
  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:3000", {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      setSocket(socketio);

      // listen all the events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });

      socketio.on("notification", (notification) => {
        setLikeNotification(notification);
      });

      return () => {
        socketio.close();
        setSocket(null);
      };
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [user,refresh]);


  return (
    
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<AuthenticatedRoute component={Home} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Other routes */}
              </Route>
            </Routes>
          </Router>
        
  );
}

// This component decides whether to show Home or Login
const AuthenticatedRoute = ({ component: Component }) => {
  const { isLoading } = useData();
  const { auth } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center">
        <Loader2 className="animate-spin h-12 w-12 text-gray-700" />
        <div className="mt-4 text-3xl font-bold text-gray-700">
          Buffering...
        </div>
      </div>
    );
  }
  return auth?.user ? <Component /> : <Navigate to="/login" />;
};
export default App;
