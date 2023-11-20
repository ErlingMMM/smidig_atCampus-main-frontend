import Button from "./Button";
import Dropdown from "../dropdown/Dropdown";
import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import SubjectCard from "./SubjectCard";
import InfoModal from "../global/Modal/InfoModal";
import { InformationCircleIcon } from "@heroicons/react/solid";

const Question = ({
  question: { id, answerType, description, hasImportance, options },
  currentQuestion,
  nextQuestion,
  prevQuestion,
  handleAnswer,
  handleEditAnswer,
  editQuestion,
  navigateBackToReceipt,
  setLoadModal,
  totalQuestions,
}) => {
  const [userAnswer, setUserAnswer] = useState();
  const [isOpen, setOpen] = useState(false);
  const [importanceAnswer, setImportanceAnswer] = useState();
  const [oldValues, setOldValues] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nextQuestionHasBeenCompleted, setNextQuestionHasBeenCompleted] =
    useState(false);
  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  // If the user has answered both the importance and the question, set isQuestionComplete to true
  useEffect(() => {
    if (Array.isArray(userAnswer)) {
      if (userAnswer.length !== 0 && importanceAnswer) {
        setIsQuestionComplete(true);
      }
      if (userAnswer.length === 0) setIsQuestionComplete(false);
    } else if (userAnswer?.option !== "") {
      if (userAnswer && importanceAnswer) setIsQuestionComplete(true);
    }
  }, [userAnswer, importanceAnswer]);

  // If question doesnt include importance, then set importanceAnswer to N/A
  useEffect(() => {
    if (!hasImportance) {
      setImportanceAnswer("N/A");
    }
  }, []);

  if (typeof window !== "undefined") {
    localStorage.getItem("loadModal");
    const sessionDataEdit = JSON.parse(sessionStorage.getItem("editSurvey"));
  }

  let onCreate;
  if (typeof window !== "undefined") {
    if (window.sessionStorage.getItem("groupSurvey") === "create") {
      onCreate = true;
    } else onCreate = false;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("editSurvey")) {
        setOldValues(sessionDataEdit);
        setOnEdit(true);
      }
    }
  }, []);

  // If the user answers "Absolutt krav", a modal will pop up asking if the user is sure they want to answer "Absolutt krav"
  useEffect(() => {
    if (importanceAnswer?.option === "Absolutt krav") {
      if (!localStorage.getItem("loadModal")) {
        localStorage.setItem("loadModal", "modalInfoShown");
        setLoadModal(true);
      }
    }
  }, [importanceAnswer]);

  const handleNextTimeout = () => {
    setTimeout(() => handleNext(), 600);
  };

  const handlePreviousTimeout = () => {
    setTimeout(() => handlePrevious(), 400);
  };

  // If user clicks next, submit answer and go to next question
  const handleNext = () => {
    if (editQuestion) {
      handleEditAnswer(id, userAnswer, importanceAnswer);
    } else {
      handleAnswer(id, description, userAnswer, importanceAnswer);
    }

    nextQuestion(currentQuestion);
  };

  // If user clicks previous, go to previous question
  const handlePrevious = () => {
    prevQuestion(currentQuestion);
  };

  const printAnswerInput = (type) => {
    switch (type.toLowerCase()) {
      case "subjects":
        return printCard();
      case "multiple choice":
        return printMultipleChoice();
      case "text":
        return printText();
      case "card":
        return printCard();
      case "select":
        return printSelect();
      case "range":
        return printRange();
      case "yes no":
        return printSelect();
      default:
        return null;
    }
  };

  const printText = () => {
    const [textValue, setTextValue] = useState("");

    useEffect(() => {
      if (editQuestion) {
        setTextValue(oldValues.answer?.option);
      }
    }, []);

    useEffect(() => {
      if (textValue?.length) {
        if (textValue.length > 1) {
          setUserAnswer({ option: textValue, value: textValue });
        } else {
          setIsQuestionComplete(false);
        }
      }
    }, [textValue]);

    return (
      <div>
        <textarea
          value={textValue}
          defaultValue={oldValues.answer?.option}
          onChange={(e) => {
            setTextValue(e.target.value);
          }}
          className="border-2 border-gray-400 h-72 w-[35rem] text-lg rounded-xl p-2"
        ></textarea>
        {onEdit ? (
          <div>
            {" "}
            <button onClick={() => setOpen(true)}>
              {" "}
              <InformationCircleIcon className="h-8 w-8  translate-x-64   text-[#6664AC] hover:text-[#514eaa]" />
            </button>
            <InfoModal setOpen={setOpen} isOpen={isOpen} info={"editText"} />
          </div>
        ) : null}
      </div>
    );
  };

  const printCard = () => {
    let groupQuestion;
    if (typeof window !== "undefined") {
      if (window.sessionStorage.getItem("groupSurvey") === "single") {
        groupQuestion = false;
      } else groupQuestion = true;
    }
    return groupQuestion ? (
      <GroupCard
        data={options}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
      />
    ) : (
      <SubjectCard
        data={options}
        userAnswer={userAnswer}
        handleUpdateCardAnswer={setUserAnswer}
      />
    );
  };

  const printSelect = () => {
    const [selectValue, setSelectValue] = useState("Velg ditt svar");

    useEffect(() => {
      if (userAnswer) {
        setSelectValue(
          options.find((option) => option.value === userAnswer.value).option
        );
      }
    }, [userAnswer]);
    return (
      <div>
        <Dropdown
          options={options}
          currentQuestion={currentQuestion}
          setDropdownValue={setUserAnswer}
          dropdownValue={selectValue}
        />
      </div>
    );
  };

  const printRange = () => {
    const [rangeValue, setRangeValue] = useState(options[1].value / 2);

    useEffect(() => {
      setUserAnswer({
        option: rangeValue.toString() + "/" + options[1].value,
        value: rangeValue.toString(),
      });
    }, [rangeValue]);

    const rangevalueText = () => {
      if (rangeValue == 0) {
        return (
          <p>
            Ønskelig med så få møter som mulig. Vi vil gjøre mest mulig på
            egenhånd. Skolen krever dog at vi danner gruppe....
          </p>
        );
      }
      if (rangeValue == 1) {
        return (
          <p>
            Ingen sure miner om det blir forsovelser eller forsinkelser. Skole
            er skole.
          </p>
        );
      }
      if (rangeValue == 2) {
        return (
          <p>
            Vi kan bli enig i starten av uka hva som skal gjøres, også snakkes
            igjen til uka.
          </p>
        );
      }
      if (rangeValue == 3) {
        return (
          <p>
            Jeg/vi jobber best alene. Terskelen er lav for å avlyse gruppemøter
            om noe uforutsett skjer.
          </p>
        );
      }
      if (rangeValue == 4) {
        return (
          <p>
            Gruppearbeid kan være bra. Man finner alltids tid til å møtes. Men
            det er så mye annet som skjer i livet som har høyere prioritet
            akkurat nå til at man får satset 100 % på grupedynamnikken
          </p>
        );
      }

      if (rangeValue == 5) {
        return (
          <p>
            Vi streber etter å ha omtrent like mye fokus på skole og
            jobb/eventuelt annet ansvar. Men en avtale er en avtale. Uforutsette
            ting kan jo skje underveis. Men det kan være irriterende om det er
            samme person hver gang.
          </p>
        );
      }
      if (rangeValue == 6) {
        return (
          <p>
            Gruppa bør møtes til avtalt tid. Om noe spesielt skjer, så gi gjerne
            beskjed i forveien. Men dette bør unngås. For mye egenarbeid gir
            ikke like gode resultater.
          </p>
        );
      }
      if (rangeValue == 7) {
        return (
          <p>
            Vi er heldigvis ikke der enda at vi blir sure om noen kommer 5
            minutter over tiden. Men folk i gruppa har en hektisk hverdag. Så
            ingen forsovelser, takk!
          </p>
        );
      }
      if (rangeValue == 8) {
        return (
          <p>
            Om jobben ringer og det er krise, dropper man likevel ikke
            gruppeavtaler. Familie bør også ha svært god forståelse for at vi er
            en fase hvor utdanningen kommer først.
          </p>
        );
      }
      if (rangeValue == 9) {
        return (
          <p>
            Dette er en satsegruppe. Vi setter av tid helt i starten av
            semesteret til å planlegge fastsatte økter for når vi kommer til å
            jobbe med ulike deler av pensum.
          </p>
        );
      }
      if (rangeValue == 10) {
        return (
          <p>
            Vi vet hva som skal til for å få en A. Legg fra deg kaffekoppen med
            en gang og kom deg tilbake til plassen din!! Skravling kan vi ta
            etter eksamen...
          </p>
        );
      }
    };

    const mojis = [
      "😑",
      "🙄",
      "😏",
      "💁‍♂️",
      "👌🏻",
      "🙂",
      "⚒️",
      "💪🏾",
      "👩🏻‍🎓",
      "😤",
      "💀",
    ];

    return (
      <div className="flex flex-col items-center gap-y-2">
        <div className="scale-125">
          {currentQuestion + 1 === totalQuestions ? (
            <>{mojis[rangeValue]}</>
          ) : null}
          <input
            value={rangeValue}
            onChange={(e) => {
              setRangeValue(e.target.value);
            }}
            name="answerRange"
            type="range"
            className="w-96 cursor-pointer"
            min={options[0].value}
            max={options[1].value}
          />
          {currentQuestion + 1 === totalQuestions ? (
            <>{mojis[rangeValue]}</>
          ) : null}
        </div>

        <div className="flex justify-between">
          <p
            className={` ${
              rangeValue < 5
                ? "text-[#6C63FF]"
                : rangeValue < 7 && rangeValue > 4
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {rangeValue}/{options[1].value}:
          </p>
          <div className="pl-1 flex flex-wrap w-[30rem] min-h-[6rem] text-center">
            {currentQuestion + 1 === totalQuestions ? (
              <>{rangevalueText()}</>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const printMultipleChoice = () => {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
      setUserAnswer(selected);
    }, [selected]);

    const handleClick = ({ option, value }) => {
      if (selected.find((item) => item.value === value)) {
        setSelected(selected.filter((item) => item.value !== value));
      } else {
        setSelected([...selected, { option, value }]);
      }
    };

    return (
      <ul className="flex space-x-4">
        {options.map(({ option, value }, index) => {
          return (
            <li
              key={index}
              className={`px-2 py-1   ${
                selected.find((item) => item.value === value)
                  ? "bg-green-300  hover:bg-green-400"
                  : "bg-gray-300 hover:bg-gray-400"
              } rounded-md`}
              onClick={() => {
                handleClick({ option, value });
              }}
            >
              <button>{option}</button>
            </li>
          );
        })}
      </ul>
    );
  };

  const printImportanceDropdown = () => {
    const [selectedValue, setSelectedValue] = useState("Hvor viktig er dette?");
    const importanceOptions = [
      {
        value: "1",
        option: "Ikke viktig",
      },
      {
        value: "2",
        option: "Litt viktig",
      },
      {
        value: "3",
        option: "Viktig",
      },
      {
        value: "4",
        option: "Absolutt krav",
      },
    ];

    useEffect(() => {
      if (importanceAnswer) {
        setSelectedValue(
          importanceOptions.find(
            (option) => option.value === importanceAnswer.value
          ).option
        );
      }
    }, [importanceAnswer]);

    return (
      <Dropdown
        options={importanceOptions}
        setDropdownValue={setImportanceAnswer}
        dropdownValue={selectedValue}
      />
    );
  };

  //If error is shown, and question complete, delete error
  useEffect(() => {
    if (isQuestionComplete) {
      setErrorMessage("");
    }
  }, [isQuestionComplete]);

  return (
    <div className="h-5/6 w-screen">
      <div
        className={`flex flex-col  items-center h-full w-screen justify-around 
           transition-all duration-500 ease-in-out`}
        style={{ transform: `translateX(-${currentQuestion * 100}%)` }}
      >
        <div className="flex flex-col items-center space-y-7">
          <div className="flex flex-col  justify-center items-center">
            <p className="text-lg break-all max-w-2xl text-center">
              {description}
            </p>
            <div className="bg-gray-300 w-[30rem] h-0.5 mt-2"></div>
          </div>

          {/* Choose answer */}
          {printAnswerInput(answerType)}
          {hasImportance && (
            <div>
              {/* Choose importance */}
              <>
                <div
                  className={` text-center pb-3 block ${
                    userAnswer ? "underline" : null
                  }`}
                >
                  <p>Velg dette spørsmålets betydning for match-resultater:</p>
                </div>

                {printImportanceDropdown()}
              </>
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-red-500 text-center">
          {errorMessage ? errorMessage : ""}
        </p>
      </div>

      {/* Buttons */}
      <div
        className={`flex flex-col pt-8 items-center h-full w-screen justify-around`}
        style={{ transform: `translateX(-${currentQuestion * 100}%)` }}
      >
        <div
          className={`flex justify-center items-center space-x-14 absolute  ${
            onCreate && answerType === "select"
              ? "top-[15.2rem]"
              : onCreate && answerType === "range"
              ? "top-[12.9rem]"
              : answerType === "yes no"
              ? "top-[15.2rem]"
              : answerType === "select"
              ? "top-[11.5rem]"
              : answerType === "range" && currentQuestion + 1 === totalQuestions
              ? "top-[9.2rem]"
              : answerType === "range" && currentQuestion + 1 !== totalQuestions
              ? "top-[7.15rem]"
              : answerType === "multiple choice"
              ? "top-[12.2rem]"
              : answerType === "card"
              ? "top-[11.2rem]"
              : onEdit
              ? "top-[5.65rem]"
              : "top-[7.65rem]"
          }`}
        >
          <Button
            handleClick={handlePreviousTimeout}
            setErrorMessage={setErrorMessage}
            currentQuestion={currentQuestion}
            navigateBackToReceipt={navigateBackToReceipt}
            direction="left"
          />
          <Button
            handleClick={handleNextTimeout}
            isQuestionComplete={isQuestionComplete}
            setErrorMessage={setErrorMessage}
            setNextQuestionHasBeenCompleted={setNextQuestionHasBeenCompleted}
            nextQuestionHasBeenCompleted={nextQuestionHasBeenCompleted}
            navigateBackToReceipt={navigateBackToReceipt}
            currentQuestion={currentQuestion}
            direction="right"
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
