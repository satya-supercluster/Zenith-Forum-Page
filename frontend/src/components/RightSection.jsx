import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const RightSection = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <button className="flex items-center text-center justify-center w-full bg-blue-500 text-white font-bold py-2 lg:px-4 px-2 rounded-lg hover:bg-blue-700 transition duration-300 max-lg:text-sm">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Start New Topic
      </button>
      <div></div>
    </div>
  );
}

export default RightSection