import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
const RightSection = () => {
  const { setNewPostSection, newPostSection } = useData();
  const { logout } = useAuth();
  return (
    <div className="pt-10 flex flex-col gap-5 w-full items-center">
      <button
        onClick={() => {
          window.scrollTo(0, 0);
          setNewPostSection(!newPostSection);
        }}
        className={`flex items-center shadow-lg shadow-blue-300 text-center justify-center w-full ${
          newPostSection
            ? "bg-red-500 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 lg:px-4 px-2 rounded-lg transition duration-300 max-lg:text-sm`}
      >
        {newPostSection ? (
          <div>Discard Post</div>
        ) : (
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <div>New Post</div>
          </div>
        )}
      </button>
      <div className="flex items-center justify-center w-full">
        <button
          className="flex items-center shadow-lg shadow-red-300 text-center justify-center w-full text-white font-bold py-2 lg:px-4 px-2 rounded-lg transition duration-300 max-lg:text-sm bg-red-500"
          onClick={logout}
        >
          <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default RightSection