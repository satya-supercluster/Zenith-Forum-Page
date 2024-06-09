import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../contexts/AuthContext';
const RightSection = ({ setNewPostSection, newPostSection }) => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col w-full items-center">
      <button
        onClick={() => setNewPostSection(!newPostSection)}
        className={`flex items-center shadow-lg shadow-blue-300 text-center justify-center w-full ${
          newPostSection
            ? "bg-red-500 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 lg:px-4 px-2 rounded-lg transition duration-300 max-lg:text-sm`}
      >
        {newPostSection ? (
          <div>Discard Topic</div>
        ) : (
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <div>New Topic</div>
          </div>
        )}
      </button>
      <div>
        <button
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default RightSection