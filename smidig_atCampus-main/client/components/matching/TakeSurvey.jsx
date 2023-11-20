import React, { useState } from "react";
import StandOut from "../../public/svg/undraw_stand_out.svg";
import TeamCollaboration from "../../public/svg/undraw_team_collaboration.svg";
import TakeSurveyButton from "./TakeSurveyButton";
import InfoModal from "../global/Modal/InfoModal";
import { InformationCircleIcon } from "@heroicons/react/solid";

const TakeSurvey = ({ side, userGroups }) => {
  const [isOpen, setOpen] = useState(false);
  return side === "left" ? (
    <div className="bg-[#FFEFCE] rounded shadow border  flex flex-col items-center justify-start w-96">
      <div className="scale-[40%] transform -translate-y-32">
        <StandOut />
      </div>
      <div className="transform translate-y-[-17.7rem] text-xl">
        Mangler du gruppe?
      </div>
      <div className="translate-y-[-14.9rem]">
        <TakeSurveyButton scope={"user"} />
      </div>
    </div>
  ) : (
    <div className="bg-[#FFEFCE] rounded shadow border  flex flex-col items-center justify-start w-96">
      <div className="scale-[55%] transform -translate-y-20">
        <TeamCollaboration />
      </div>
      <div className="transform translate-y-[-8.6rem] text-xl">
        Min gruppe trenger flere
      </div>
      <div className="-translate-y-24">
        {userGroups.length > 0 ? (
          <TakeSurveyButton scope={"group"} />
        ) : (
          <>
            <div className="text-red-500 translate-y-3">
              <strong>Du har ikke opprettet en gruppe</strong>
            </div>
            <button onClick={() => setOpen(true)}>
              <InformationCircleIcon className="h-8 w-8 translate-x-[6.45rem] translate-y-3 text-[#6664AC] hover:text-[#514eaa]" />
            </button>
            <InfoModal
              isOpen={isOpen}
              setOpen={setOpen}
              info={"matchingIndex"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TakeSurvey;
