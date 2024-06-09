import React from "react";
import NewPost from "./NewPost";

const MiddleSection = ({newPostSection}) => {

  return (
    <div className="w-full mx-5">
      {newPostSection?
        <NewPost/>:
      <div></div>}
    </div>
  );
};

export default MiddleSection;
