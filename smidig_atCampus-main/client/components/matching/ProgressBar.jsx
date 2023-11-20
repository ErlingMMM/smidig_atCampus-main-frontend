import React from "react";

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="w-full h-6 bg-red-300 sticky flex justify-center items-center overflow-hidden">
      <div
        className="absolute left-0 bg-[#16a085] h-full transition-all duration-500 rounded-r-full ease-in-out"
        style={{
          width: ((currentQuestion + 1) / totalQuestions) * 101 + "%",
        }}
      ></div>
      <div className="z-20">
        {currentQuestion !== totalQuestions
          ? currentQuestion + 1
          : (currentQuestion = totalQuestions)}
        /{totalQuestions}
      </div>
    </div>
  );
};

export default ProgressBar;
