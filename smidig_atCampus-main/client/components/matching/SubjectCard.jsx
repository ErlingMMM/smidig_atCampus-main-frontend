import React, { useState } from "react";
import SubjectModal from "./SubjectModal";
import { PencilAltIcon } from "@heroicons/react/outline";

function SubjectCard({ data, userAnswer, handleUpdateCardAnswer }) {
  const [isOpen, setOpen] = useState(false);
  const [isStandardSubjectPicked, setStandardSubjectPicked] = useState(true);
  const handleClick = () => setOpen(true);
  const subjects = data[0];

  return (
    <div className={`flex items-center flex-wrap`}>
      <div className="grid grid-cols-3 max-w-7xl gap-4">
        {subjects.map((subject, index) => {
          return (
            <button
              key={index}
              value={subject.name}
              onClick={() => {
                console.log(userAnswer);

                setStandardSubjectPicked(true);
                handleUpdateCardAnswer({
                  option: subject.name,
                  value: subject.id,
                });
              }}
              className={`hover:scale-95`}
            >
              {/*Onclick animation*/}
              <a className="relative inline-block text-lg group p-5  w-96 h-7 ">
                <span className="relative z-10 block  h-14  overflow-hidden leading-tight ease-in text-white rounded-lg ">
                  <span className="absolute inset-0 rounded-lg bg-[#6664AC]"></span>
                  {/*Green box for onclick*/}
                  <span
                    className={`absolute -left-10 w-[47rem] h-[47rem] -ml-64 transition-all duration-700 origin-top-right rounded-r-full  bg-[#16a085]  -translate-x-full translate-y-16 ease ${
                      isStandardSubjectPicked &&
                      userAnswer?.option === subject.name
                        ? "-rotate-180"
                        : "-rotate-90"
                    }`}
                  ></span>
                  <span className="relative text-sm top-4">{subject.name}</span>
                </span>
              </a>
            </button>
          );
        })}

        <button className={`hover:scale-95`} onClick={handleClick}>
          <a className="relative inline-block text-lg group p-5  w-96 h-7 ">
            <span className="relative z-10 block  h-14  overflow-hidden leading-tight ease-in text-white rounded-lg">
              <span className="absolute inset-0 rounded-lg bg-[#6664AC]"></span>
              <span
                className={`absolute -left-10 w-[47rem] h-[47rem] -ml-64 transition-all duration-700 origin-top-right rounded-r-full -translate-x-full translate-y-24 bg-[#16a085] ease ${
                  !isStandardSubjectPicked
                    ? "delay-300 -rotate-180"
                    : "-rotate-90"
                }`}
              ></span>
              <span className="relative text-sm top-4">
                {!isStandardSubjectPicked ? (
                  <span className="flex  justify-center">
                    <span>{userAnswer}</span>
                    <span>
                      <PencilAltIcon className="h-7 w-7 pl-2 pb-2" />
                    </span>
                  </span>
                ) : (
                  "Annet"
                )}
              </span>
            </span>
          </a>
        </button>
        <SubjectModal
          isOpen={isOpen}
          setOpen={setOpen}
          handleUpdateModalAnswer={handleUpdateCardAnswer}
          setStandardSubjectPicked={setStandardSubjectPicked}
          isStandardSubjectPicked={isStandardSubjectPicked}
        />
      </div>
    </div>
  );
}

export default SubjectCard;
