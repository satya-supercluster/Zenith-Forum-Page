import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { useData } from '../contexts/DataContext';
const BottomBar = () => {
  const { logout,auth } = useAuth();
  const { setNewPostSection, newPostSection } = useData();
  return auth ? (
    <div className="min-[500px]:hidden fixed bottom-0 bg-gray-700 rounded-t-3xl w-screen h-12 py-1 px-5">
      <div className="w-full h-full flex justify-center gap-5 items-center">
        <div className="flex items-center text-white text-lg">
          <FontAwesomeIcon icon={faSearch} className=" p-3" />
          Search
        </div>
        <div>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              setNewPostSection(!newPostSection);
            }}
            className={`text-white flex justify-center items-center px-2 ${
              newPostSection
                ? "bg-red-500 hover:bg-red-700 shadow-sm shadow-red-300"
                : "bg-blue-500 hover:bg-blue-700 shadow-sm shadow-blue-300"
            } h-10 rounded`}
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
        </div>
        <button className="p-3 text-white text-lg flex items-center" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="pr-2" />
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default BottomBar