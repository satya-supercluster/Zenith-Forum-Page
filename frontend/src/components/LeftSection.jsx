import React, { useState } from 'react'

const LeftSection = () => {
  const [select, setSelect] = useState(1);
  return (
    <div className="py-10 px-5">
      <div className="flex flex-col gap-5 w-full items-start text-lg bg-white p-5 rounded-lg">
        <button onClick={()=>setSelect(1)} className={`p-2 rounded-lg w-full text-left ${select==1?"text-white bg-blue-500":""}`}>Home</button>
        <button onClick={()=>setSelect(2)} className={`p-2 rounded-lg w-full text-left ${select==2?"text-white bg-blue-500":""}`}>My Posts</button>
        <button onClick={()=>setSelect(3)} className={`p-2 rounded-lg w-full text-left ${select==3?"text-white bg-blue-500":""}`}>My Answers</button>
        <button onClick={()=>setSelect(4)} className={`p-2 rounded-lg w-full text-left ${select==4?"text-white bg-blue-500":""}`}>My Likes</button>
      </div>
    </div>
  );
}

export default LeftSection