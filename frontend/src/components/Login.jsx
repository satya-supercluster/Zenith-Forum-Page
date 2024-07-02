import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
const Login = () => {
  const { userLoginWithGoogle,signing,setSigning } = useAuth();
  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="bg-white m-5 p-8 rounded-lg shadow-md shadow-blue-300 leading-1 sm:w-1/2 lg:w-1/3">
        <h1 className="text-2xl max-sm:text-lg mb-1 text-left font-bold">
          Welcome
        </h1>
        <h1 className="text-xl max-sm:text-sm mb-4 text-left font-bold">
          Let's take the acceleration of coding culture to the peak
        </h1>
        <h2 className="text-xl max-sm:text-sm mb-4 text-left font-bold">
          Sign In
        </h2>
        <button
          onClick={() => {
            setSigning(true);
            userLoginWithGoogle();
          }}
          className="flex max-sm:text-sm flex-col items-center text-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md"
        >
          <FontAwesomeIcon className="mr-2 text-white" icon={faGoogle} />
          {signing ? <div>Signing in...</div> : <div>Sign in with Google</div>}
        </button>
        <div className="text-sm font-semibold">
          Free instance server will spin down with inactivity, which can delay
          requests by 50 seconds or more.
        </div>
      </div>
    </div>
  );
};

export default Login;
