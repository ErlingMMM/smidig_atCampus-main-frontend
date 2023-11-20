import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Button = ({
  direction,
  handleClick,
  isQuestionComplete,
  setErrorMessage,
  nextQuestionHasBeenCompleted,
  setNextQuestionHasBeenCompleted,
  currentQuestion,
  navigateBackToReceipt,
}) => {
  const [isBtnJustClicked, setJustClicked] = useState(false);
  const [isNextQuestionAlreadyCompleted, setNextQuestionAlreadyCompleted] =
    useState(false);
  const router = useRouter();

  let surveyMode = "";

  if (typeof window != "undefined") {
    if (sessionStorage.getItem("groupSurvey") === "group") {
      surveyMode = "group";
    } else if (sessionStorage.getItem("groupSurvey") === "create") {
      surveyMode = "create";
    }
  }

  const handleClickLeftBtn = () => {
    handleClick();
    mainAnimationDelay();
    setErrorMessage("");
    if (currentQuestion === 0) navigateBackToStart();
  };

  const navigateBackToStart = () => router.push("/matching");

  const handleClickRightBtn = () => {
    handleClick();

    if (
      (surveyMode === "group" && currentQuestion === 1) ||
      (surveyMode === "create" && currentQuestion === 2)
    ) {
      mainAnimationDelay();
      nextQuestionAlreadyCompleted();
    }

    if (!nextQuestionHasBeenCompleted) {
      mainAnimationDelay();
      setNextQuestionHasBeenCompleted(true);
    } else {
      nextQuestionAlreadyCompleted();
    }
  };

  const nextQuestionAlreadyCompleted = () => {
    setNextQuestionAlreadyCompleted(true);
    setTimeout(() => setNextQuestionAlreadyCompleted(false), 400);
  };

  const mainAnimationDelay = () => {
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 800);
  };

  return direction === "left" ? (
    !navigateBackToReceipt ? (
      <button
        onClick={handleClickLeftBtn}
        className={`flex justify-center items-center h-20 w-20 bg-white rounded-full text-green-500 transition ease-in-out delay-150  hover:-translate-x-1 hover:scale-95 hover:bg-gray-100 duration-1000
      material-arrow-btn  ${
        isBtnJustClicked ? "onclick-animation-arrow-btn cursor-wait" : null
      } border-arrow-btn`}
      >
        <div className="flex h-full w-full transition ease-in-out delay-300  hover:-translate-x-1 hover:scale-125 duration-700">
          <ArrowLeftIcon className="h-10 mt-5 ml-5" />
        </div>
      </button>
    ) : null
  ) : (
    <button
      onClick={() =>
        isQuestionComplete
          ? handleClickRightBtn()
          : setErrorMessage("Du har ikke svart på alt")
      }
      className={`flex  justify-center items-center h-20 w-20   ${
        isBtnJustClicked ? "gray-out-animate cursor-wait" : null
      }  ${
        isNextQuestionAlreadyCompleted
          ? "onclick-animation-right-btn material-arrow-btn colored-background border-arrow-btn cursor-wait"
          : null
      }
      ${
        !isQuestionComplete && !isBtnJustClicked
          ? "bg-gray-300 cursor-not-allowed"
          : "background-post-fill  right-arrow-btn-animation-position right-arrow-btn-animation-fill transition ease-in-out delay-150  hover:translate-x-1 hover:scale-95 hover:bg-green-600 duration-1000"
      } rounded-full text-white `}
    >
      <div
        className={`flex h-full ${
          isQuestionComplete
            ? "hover:translate-x-1 hover:scale-125 duration-700"
            : null
        } w-full transition ease-in-out delay-150`}
      >
        <ArrowRightIcon className="h-10 mt-5 ml-5 z-10" />
      </div>
    </button>
  );
};

export default Button;
