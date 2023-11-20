import React from "react";
import TakeSurvey from "../components/matching/TakeSurvey";
import SearchGroup from "../components/matching/SearchGroup";
import NavBar from "../components/global/Navbar";
import CreateGroup from "../components/matching/CreateGroup";
import { useRecoilValue } from "recoil";
import { groupsState } from "../stores/atoms";


const Matching = () => {
  const userGroups = useRecoilValue(groupsState);

  if (typeof window !== "undefined") {
    sessionStorage.removeItem("confetti");
    sessionStorage.removeItem("editSurvey");
  }

  return (
    <>
      <NavBar currentUrl={"matching"} />
      <div className="flex-col justify-between flex items-center w-screen h-screen p-5 overflow-hidden">
        <div className="font-bold text-4xl">Kollokviematcher</div>
        <div className="bg-gray-500 w-[30rem] h-0.5 mb-5"></div>

        <div className="gap-8 flex justify-center h-[33rem] ">
          <div className="flex justify-start">
            <TakeSurvey side="left" />
          </div>

          <div className="flex justify-end">
            <TakeSurvey side="right" userGroups={userGroups} />
          </div>
        </div>
        <div className="grid grid-cols-2 max-w-7xl gap-7">
          <SearchGroup />
          <CreateGroup />
        </div>
      </div>
    </>
  );
};

export default Matching;
