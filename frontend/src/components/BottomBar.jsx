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
        <FontAwesomeIcon icon={faSearch} className=" p-3 text-white text-lg" />
        <div>
          <button
            onClick={() => setNewPostSection(!newPostSection)}
            className={`text-white flex justify-center items-center px-2 ${
              newPostSection
                ? "bg-red-500 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-700"
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
        <button className="p-3" onClick={logout}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-white text-lg"
          />
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default BottomBar