import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../stores/atoms";

const SubjectModal = ({
  isOpen,
  setOpen,
  handleUpdateModalAnswer,
  setStandardSubjectPicked,
  isStandardSubjectPicked,
}) => {
  const [textInput, setTextInput] = useState("");
  const [choosenSubject, setChoosenSubject] = useState("");
  const [isSubjectSelected, setSubjectIsSelected] = useState(false);
  const token = useRecoilValue(tokenState);
  const [subjectsData, setSubjectsData] = useState(null);

  useEffect(() => {
    if (choosenSubject !== "") {
      setSubjectIsSelected(true);
    }
  }, [choosenSubject]);

  useEffect(() => {
    if (isStandardSubjectPicked) {
      setSubjectIsSelected(false);
      setChoosenSubject("");
    }
  }, [isStandardSubjectPicked]);

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleClick = (e) => {
    setChoosenSubject(e.target.value);
  };

  const handleClickOKButton = () => {
    setStandardSubjectPicked(false);
    handleUpdateModalAnswer(choosenSubject);
    setOpen(false);
  };

  const handleClear = () => {
    setTextInput("");
    setChoosenSubject("");
    setSubjectIsSelected(false);
  };

  const fetchSubjects = async () => {
    const res = await fetch(`https://copia.dev/api/Subject/GetAllSubjects`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const subjectArray = data.map((subject) => subject.name);

    setSubjectsData(subjectArray);
  };

  useEffect(() => {
    fetchSubjects();
  });

  // const result = subjectsData.filter((subject) =>
  //   subject.name.toLowerCase().includes(textInput)
  // ).name;

  //Sort sort alphabetically a-z
  // result.sort(function (a, b) {
  //   return a.localeCompare(b); //using String.prototype.localCompare()
  // });

  let key = 0;

  if (subjectsData) {
    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              <div
                className="absolute w-screen h-screen bg-[rgba(0,0,0,0.7)] z-10"
                onClick={() => setOpen(false)}
              ></div>
              <div className=" flex flex-col justify-center items-center bg-white rounded-xl p-4 space-y-2 z-30">
                <div className="w-full h-10 flex justify-end">
                  <button
                    className={`rounded-full w-8 h-8 border border-transparent shadow-sm bg-gray-300 hover:bg-purple-400  hover:text-white text-base font-medium   focus:outline-none  focus:ring-transparent`}
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div>
                  <div className="w-96 h-96 border-2 border-gray-400 rounded-xl overflow-y-scroll">
                    <div className="flex flex-wrap gap-2 justify-center items-center p-4">
                      {subjectsData.map((subjectResult) => {
                        if (
                          subjectResult
                            .toLowerCase()
                            .includes(textInput.toLowerCase())
                        ) {
                          return (
                            <button
                              key={key++}
                              value={subjectResult}
                              onClick={handleClick}
                              className={`${
                                choosenSubject === subjectResult
                                  ? "bg-blue-200 hover:bg-blue-300"
                                  : "hover:bg-gray-200"
                              } rounded-md px-2 py-1`}
                            >
                              {subjectResult}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <textarea
                    placeholder="Søk etter et emne:"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "Søk etter et emne:")
                    }
                    value={textInput}
                    defaultValue={textInput}
                    onChange={handleChange}
                    className="border-2 border-gray-400 h-10 w-96 text-lg rounded-xl mt-4 focus:outline-none  focus:ring-transparent pt-1 pl-2 placeholderHoverSubject"
                  ></textarea>
                </div>
                <div className="flex justify-between items-center w-full px-8">
                  <button
                    className={
                      "w-14 py-2 rounded-md border border-transparent shadow-sm bg-gray-300 hover:bg-gray-400 text-center"
                    }
                    onClick={handleClear}
                  >
                    Tøm
                  </button>
                  <button
                    className={`rounded-md border border-transparent shadow-sm px-4 py-2 ${
                      isSubjectSelected
                        ? "bg-[#6664AC] hover:bg-[#403e7e] text-white"
                        : "bg-gray-300 cursor-not-allowed"
                    } focus:outline-none  focus:ring-transparent`}
                    onClick={handleClickOKButton}
                  >
                    Velg
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    );
  } else {
    return null;
  }
};

export default SubjectModal;
