import React from "react";
const AnswerCard = ({ answer }) => {
  return (
    <div className="bg-white p-3 rounded-lg">
      <div className="font-bold text-[0.7rem] mb-1 break-words overflow-hidden">
        Answered By: {answer.user.name}
      </div>
      <div className="p-2 bg-slate-300 rounded-lg break-words overflow-hidden">
        {answer.answer}
      </div>
    </div>
  );
};

export default AnswerCard;
