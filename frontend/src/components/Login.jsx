import React from "react";

const Login = ({signIn}) => {

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl mb-4 text-center font-bold">Sign In</h1>
        <button
          onClick={signIn}
          className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path
              fill="#4285F4"
              d="M24 9.5c3.2 0 5.8 1.1 7.7 3.1l5.7-5.7C33.4 3.2 28.9 1 24 1 14.9 1 7.4 6.6 4.3 14.5l6.9 5.4C12.7 15 17.9 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.9 24.2c0-1.5-.1-2.9-.3-4.3H24v8.1h12.8c-.5 2.6-2 4.8-4.1 6.3l6.5 5.1c3.8-3.5 6.2-8.7 6.2-14.9z"
            />
            <path
              fill="#FBBC05"
              d="M10.1 28.9c-1.3-.7-2.5-1.7-3.4-2.9l-6.9 5.4c2.7 5.3 7.7 9.2 13.6 10.8l5.3-6.8c-3.3-.7-6.3-2.4-8.6-4.9z"
            />
            <path
              fill="#EA4335"
              d="M24 46c5.1 0 9.4-1.7 12.5-4.7l-5.3-6.8c-2.1 1.4-4.8 2.3-7.7 2.3-5.7 0-10.5-3.8-12.2-8.9l-6.9 5.4c3.1 6.1 9.3 10.3 16.6 10.3z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
