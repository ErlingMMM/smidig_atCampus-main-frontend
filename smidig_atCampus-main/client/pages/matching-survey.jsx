import React, { useState, useEffect } from "react";
import Hero from "../components/matching/Hero";
import ProgressBar from "../components/matching/ProgressBar";
import Question from "../components/matching/Question";
import MatchingReceipt from "../components/matching/MatchingReceipt";
import AlertModal from "../components/matching/Modal";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { groupsState } from "../stores/atoms";

const DataLayer = () => {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  let token = "";
  let surveyMode = "";

  if (typeof window != "undefined") {
    token = localStorage.getItem("user-token");
    if (sessionStorage.getItem("groupSurvey") === "single") {
      surveyMode = "user";
    } else if (sessionStorage.getItem("groupSurvey") === "group") {
      surveyMode = "group";
    } else if (sessionStorage.getItem("groupSurvey") === "create") {
      surveyMode = "create";
    }
  } else {
    console.log("window undefined");
  }

  useEffect(async () => {
    if (surveyMode === "user" || surveyMode === "group") {
      console.log("fetching with audience: " + surveyMode);
      const res = await fetch(
        `https://copia.dev/api/survey/getsurvey?audience=${surveyMode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      });

      setQuestions(res.questions);
      setSubjects(res.subjects);
    } else {
      console.log("Fetching subjects");
      const res = await fetch(
        "https://copia.dev/api/subject/getallusersubjects",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setSubjects(data);
    }
  }, []);

  if (subjects.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <MatchingSurvey
          questions={questions}
          subjects={subjects}
          scope={surveyMode}
        />
      </>
    );
  }
};

const MatchingSurvey = ({ questions, subjects, scope }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [survey, setSurvey] = useState([]);
  const [editQuestion, setEditQuestion] = useState(false);
  const [navigateBackToReceipt, setNavigateBackToReceipt] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const router = useRouter();
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const groups = useRecoilValue(groupsState);

  const generateSubjectQuestion = () => {
    return {
      id: "subjectsQuestion",
      hasImportance: false,
      description: "Hvilket fag ønsker du å finne en gruppe til?",
      type: "subjects",
      answerType: "card",
      options: [
        subjects.map((subject) => {
          return {
            name: subject.name,
            id: subject.id,
          };
        }),
      ],
    };
  };

  //Generate group questuion ( Card ), what group do you want to find a match for?
  const generateGroupQuestion = () => {
    return {
      id: "groupQuestion",
      hasImportance: false,
      description: "Hvilken gruppe ønsker du å finne nye medlemmer til?",
      type: "groups",
      answerType: "card",
      options: [
        groups.map((group) => {
          return {
            name: group.name,
            id: group.id,
          };
        }),
      ],
    };
  };

  const generateCreateQuestions = () => {
    return [
      {
        id: "nameQuestion",
        hasImportance: false,
        description: "Hva skal gruppens navn være?",
        type: "create",
        answerType: "text",
        options: [],
      },
      {
        id: "descriptionQuestion",
        hasImportance: false,
        description: "Hva skal gruppens beskrivelse være?",
        type: "create",
        answerType: "text",
        options: [],
      },
      {
        id: "typeQuestion",
        hasImportance: false,
        description: "Hvilken type gruppe ønsker du å opprette?",
        type: "create",
        answerType: "select",
        options: [
          {
            option: "Eksamensgruppe",
            value: "exam",
          },
          {
            option: "Semestergruppe",
            value: "semester",
          },
          {
            option: "Arbeidskravgruppe",
            value: "workRequirement",
          },
        ],
      },
      {
        id: "membersQuestion",
        hasImportance: false,
        description: "Hvor mange medlemmer skal gruppen ha?",
        type: "create",
        answerType: "range",
        options: [
          { option: "0", value: "0" },
          { option: "10", value: "10" },
        ],
      },
    ];
  };

  useEffect(() => {
    if (scope === "group") {
      const groupQuestion = generateGroupQuestion();
      setSurveyQuestions([groupQuestion, ...questions]);
    } else if (scope === "user") {
      const subjectQuestion = generateSubjectQuestion();
      setSurveyQuestions([subjectQuestion, ...questions]);
    } else if (scope === "create") {
      const subjectQuestion = generateSubjectQuestion();
      const createQuestions = generateCreateQuestions();
      setSurveyQuestions([...createQuestions, subjectQuestion]);
    }
    //We do not want the user to type in <matching-survey> directly in browser, without first in the session, choosing group-survey/single-survey in the <matching> url
    if (scope !== "user" && scope !== "group" && scope !== "create") {
      router.push("/matching");
    }
  }, [questions, subjects]);

  const handleCurrentQuestionReceipt = (questionIndex) => {
    setCurrentQuestion(parseInt(questionIndex));
    setEditQuestion(true);
    setNavigateBackToReceipt(true);
  };

  //Enable button for next question if importance and answer is chosen
  const nextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }

    if (currentQuestion === surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (navigateBackToReceipt) {
      setCurrentQuestion(surveyQuestions.length);
      setNavigateBackToReceipt(false);
    }
  };

  //Go to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  //Handle answered question
  const handleAnswer = (questionId, text, answer, importance) => {
    if (survey.find((item) => item.id === questionId)) {
      setSurvey((prevState) => {
        const deletedOld = prevState.filter(
          (question) => question.id !== questionId
        );
        return [
          ...deletedOld,
          {
            id: questionId,
            text,
            answer: answer,
            importance: importance,
          },
        ];
      });
    } else {
      setSurvey((prevState) => {
        return [
          ...prevState,
          {
            id: questionId,
            text,
            answer: answer,
            importance: importance,
          },
        ];
      });
    }
  };

  const handleEditAnswer = (questionId, answer, importance) => {
    const itemIndex = survey.findIndex((item) => item.id === questionId);
    setSurvey((prevState) => {
      const old = prevState[itemIndex];
      if (old.answer !== answer) {
        old.answer = answer;
      }
      if (old.importance !== importance) {
        old.importance = importance;
      }
      return prevState;
    });
  };

  return (
    <>
      {loadModal ? (
        <div>
          <AlertModal />
        </div>
      ) : null}
      <div className="h-screen overflow-x-hidden">
        <Hero currentQuestion={currentQuestion} questionForGroup={false} />
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={surveyQuestions.length}
        />
        {/*Need to check both in case the user want to get back and edit a question*/}
        {survey.length === surveyQuestions.length &&
        currentQuestion === surveyQuestions.length ? (
          <MatchingReceipt
            survey={survey}
            handleCurrentQuestionReceipt={handleCurrentQuestionReceipt}
            editQuestion={editQuestion}
            currentQuestion={currentQuestion}
            scope={scope}
          />
        ) : (
          <QuestionsElement
            questions={surveyQuestions}
            currentQuestion={currentQuestion}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
            handleAnswer={handleAnswer}
            handleEditAnswer={handleEditAnswer}
            navigateBackToReceipt={navigateBackToReceipt}
            editQuestion={editQuestion}
            setLoadModal={setLoadModal}
            totalQuestions={surveyQuestions.length}
          />
        )}
      </div>
    </>
  );
};

const QuestionsElement = ({
  questions,
  currentQuestion,
  nextQuestion,
  prevQuestion,
  handleAnswer,
  handleEditAnswer,
  navigateBackToReceipt,
  editQuestion,
  setLoadModal,
  totalQuestions,
}) => {
  return (
    <div
      className={`flex items-center justify-start w-screen ${
        currentQuestion === 2 && totalQuestions > 6 ? "mt-24" : "mt-1"
      }`}
    >
      {questions.map((question) => {
        return (
          <Question
            handleAnswer={handleAnswer}
            handleEditAnswer={handleEditAnswer}
            editQuestion={editQuestion}
            key={question.id}
            question={question}
            currentQuestion={currentQuestion}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
            navigateBackToReceipt={navigateBackToReceipt}
            setLoadModal={setLoadModal}
            totalQuestions={totalQuestions}
          />
        );
      })}
    </div>
  );
};

export default DataLayer;
