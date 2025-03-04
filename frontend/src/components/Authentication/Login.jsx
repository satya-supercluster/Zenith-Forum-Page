// Login.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "sonner";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { auth,setAuthUser } = useAuth();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(formData),
      });

      const data = await res.json(); 

      if (data.success) {
        setAuthUser(data.user);
        navigate("/");
        toast.success(data.message);
        setFormData({
          email: "",
          password: "",
        });
      } else {
        throw new Error(data.message); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">ZENITH</h1>
          <p className="mt-2 text-sm text-gray-300">
            Login to the Coding Club Of MANIT
          </p>
        </div>

        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200"
            >
              Sc. Number
            </label>
            <input
              id="username"
              name="username"
              type="number"
              required
              value={formData.username}
              onChange={changeEventHandler}
              className="block w-full px-3 py-2 mt-1 text-blue-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={changeEventHandler}
              className="block w-full px-3 py-2 mt-1 border text-blue-600  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
