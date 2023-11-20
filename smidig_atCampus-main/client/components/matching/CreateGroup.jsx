import React from "react";
import Link from "next/link";
import TakeSurveyButton from "./TakeSurveyButton";

function CreateGroup() {
  return (
    <div>
      <div className=" grid grid-cols-1 place-items-center justify-between leading-tight md:p-4 mt-1 bg-[#FFEFCE] rounded shadow border w-96 h-36">
        <div className="text-xl">Vil du opprette en ny gruppe?</div>
        <div>
          <TakeSurveyButton scope={"create"} />
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
