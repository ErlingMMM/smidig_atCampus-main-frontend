import React, { useState } from "react";
import InfoModal from "../global/Modal/InfoModal";
import { InformationCircleIcon } from "@heroicons/react/solid";

const CalendarViewToggle = ({ setActiveView }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className="w-64 h-8 bg-yellow-200 rounded-md flex justify-center items-center">
        <div
          className="w-1/2 h-full flex justify-center items-center cursor-pointer rounded-md viewBtn"
          onClick={() => setActiveView("month")}
          id="monthBtn"
        >
          Måned
        </div>
        <div
          className="w-1/2 h-full flex justify-center items-center cursor-pointer rounded-md viewBtn"
          onClick={() => setActiveView("week")}
          id="weekBtn"
        >
          Uke
        </div>
      </div>
      <button onClick={() => setOpen(true)}>
        {" "}
        <InformationCircleIcon className="h-8 w-8 -translate-y-8 translate-x-64   text-[#6664AC] hover:text-[#514eaa]" />
      </button>
      <InfoModal setOpen={setOpen} isOpen={isOpen} info={"calendar"} />
    </div>
  );
};

export default CalendarViewToggle;
