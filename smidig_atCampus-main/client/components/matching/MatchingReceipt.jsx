import React, { useEffect, useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import Confetti from "react-confetti";
import { useRecoilValue } from "recoil";
import { userState, tokenState } from "../../stores/atoms";
import Router from "next/router";

const MatchingReceipt = ({
  scope,
  survey,
  handleCurrentQuestionReceipt,
  currentQuestion,
}) => {
  const [isConfettiOn, setConfettiOn] = useState(false);
  const [runReceiptsAnimation, setRunReceiptsAnimation] = useState(false);
  const [surveyMode, setSurveyMode] = useState("");
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("confetti") && currentQuestion !== 0) {
        setTimeout(() => setConfettiOn(true), 2000);
        setRunReceiptsAnimation(true);
        setTimeout(() => setConfettiOn(false), 9000);
        setTimeout(() => setRunReceiptsAnimation(false), 3000);
        sessionStorage.setItem("confetti", "done");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window != "undefined") {
      if (sessionStorage.getItem("groupSurvey") === "single") {
        setSurveyMode("user");
      } else if (sessionStorage.getItem("groupSurvey") === "group") {
        setSurveyMode("group");
      }
    }
  }, []);

  const handleSubmit = async (survey) => {
    if (scope === "group" || scope === "user") {
      const surveyeeId = () => {
        if (surveyMode === "user") {
          return user.id;
        } else if (surveyMode === "group") {
          return survey.find((question) => question.id === "groupQuestion")
            .answer.value;
        }
      };

      const subjectId = () => {
        if (surveyMode === "user") {
          const subject = survey.find(
            (answer) => answer.id === "subjectsQuestion"
          );
          return subject.answer.value;
        } else if (surveyMode === "group") {
          return null;
        }
      };

      const parseAnswer = (answer) => {
        if (Array.isArray(answer)) {
          return answer.map((answer) => answer.value).join(",");
        } else {
          return answer.value;
        }
      };

      const questionAnswers = () => {
        const answers = survey.filter(
          (answer) =>
            answer.id !== "subjectsQuestion" && answer.id !== "groupQuestion"
        );
        return answers.map((answer) => {
          return {
            questionId: answer.id,
            answer: parseAnswer(answer.answer),
            importance: answer.importance.value,
          };
        });
      };

      const requestBody = {
        subjectId: subjectId(),
        surveyeeId: surveyeeId(),
        audience: surveyMode,
        questionAnswers: questionAnswers(),
      };

      const res = await fetch("https://copia.dev/api/survey/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      console.log(data);
      if (data) {
        scope === "group"
          ? Router.push("/groups")
          : Router.push(`/results?surveyId=${data}`);
      }
    } else if (scope === "create") {
      const subjectId = () => {
        const subject = survey.find(
          (answer) => answer.id === "subjectsQuestion"
        );
        return subject.answer.value;
      };

      const groupName = () => {
        const question = survey.find((answer) => answer.id === "nameQuestion");
        return question.answer.value;
      };

      const groupDescription = () => {
        const question = survey.find(
          (answer) => answer.id === "descriptionQuestion"
        );
        return question.answer.value;
      };

      const groupType = () => {
        const question = survey.find((answer) => answer.id === "typeQuestion");
        return question.answer.value;
      };

      const membersQuestion = () => {
        const question = survey.find(
          (answer) => answer.id === "membersQuestion"
        );
        return question.answer.value;
      };

      const requestBody = {
        subjectId: subjectId(),
        name: groupName(),
        description: groupDescription(),
        type: groupType(),
        memberLimit: membersQuestion(),
      };

      console.log(requestBody);

      const res = await fetch("https://copia.dev/api/colloquium/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      console.log(data);
      if (data) {
        window.location.href = `/groups`;
      }
    }
  };

  return (
    <>
      {isConfettiOn ? <Confetti className="opacityConfetti" /> : null}
      <div
        className={`w-screen overflow-x-hidden flex flex-col justify-center items-center ${
          runReceiptsAnimation ? "overflow-y-hidden " : "overflow-y-scroll"
        }`}
      >
        <div className="flex justify-center items-center flex-col mt-8">
          <h1 className="font-bold text-xl">Dine avgitte svar</h1>
          <div className="bg-gray-300 w-[30rem] h-0.5"></div>
        </div>

        <div className="pt-8 grid grid-cols-3 gap-y-9 gap-x-7 pb-10 mx-16 mb-24">
          {survey.map((question, index) =>
            getReceipt(
              question,
              index,
              handleCurrentQuestionReceipt,
              runReceiptsAnimation
            )
          )}
        </div>
        {/* Submit Btn */}
        <button
          className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-green-500 text-white text-2xl px-8 py-4 rounded-lg cursor-pointer hover:scale-95"
          onClick={() => {
            handleSubmit(survey);
          }}
        >
          {scope != "create" ? "Send inn dine svar" : "Opprett gruppe"}
        </button>
      </div>
    </>
  );
};

function getReceipt(
  question,
  index,
  handleCurrentQuestionReceipt,
  runReceiptsAnimation
) {
  const [lastEdit, setLastEdit] = useState(false);

  if (typeof window !== "undefined") {
    useEffect(() => {
      const lastEditData = sessionStorage.getItem("lastEdited");
      setLastEdit(parseInt(lastEditData));
    }, []);
  }

  let userAnswer = "";
  if (Array.isArray(question.answer)) {
    const answers = question.answer.map((answer) => answer.option);
    userAnswer = answers.join(",");
  } else {
    userAnswer = question.answer.option;
  }

  return (
    <div
      key={question.id}
      className={`flex flex-col items-center bg-purple-200 moveReceipt ${
        !runReceiptsAnimation
          ? null
          : (index + 1) % 3 === 0
          ? "thirdMoveReceipt"
          : index % 3 === 0
          ? "firstMoveReceipt"
          : "secondMoveReceipt"
      } rounded-md transition-all overflow-hidden text-ellipsis`}
    >
      {/* Header */}
      <div className="py-2 bg-purple-300 w-full flex justify-between items-center px-8">
        <p className="text-xl font-bold">Spørsmål {index + 1}</p>
        <PencilAltIcon
          className="h-8 w-8 hover:text-green-500  cursor-pointer"
          value={index}
          onClick={() => {
            sessionStorage.setItem("lastEdited", index);
            sessionStorage.setItem(
              "editSurvey",
              JSON.stringify({
                answer: question.answer,
                importance: question.importance,
              })
            );

            handleCurrentQuestionReceipt(index);
          }}
        />
      </div>
      {/* Content */}
      <div
        className={`w-full flex flex-col items-center justify-center py-4 space-y-2 `}
      >
        <p className="text-xl underline">{question.text}</p>
        <div className={`${index === lastEdit ? "opacityReceiptText" : null}`}>
          {/* In case users write long text */}
          <p className="text-lg break-all max-w-xs max-h-7 text-center  overflow-hidden">
            {/* Svar: {question.answer.option} */}
            Svar: {userAnswer}
          </p>
          {question.importance != "N/A" ? (
            <p>
              Viktighet:{" "}
              {question.importance === "Absolutt krav" ? (
                <strong>{question.importance.option}</strong>
              ) : (
                <span>{question.importance.option}</span>
              )}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MatchingReceipt;
