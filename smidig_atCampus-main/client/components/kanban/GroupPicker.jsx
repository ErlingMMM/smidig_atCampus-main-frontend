import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";

const GroupPicker = ({ title }) => {
  return (
    <div className="h-3/4 w-48 rounded-md bg-yellow-200 flex items-center px-2 shadow-md">
      <div className="w-4/5">{title}</div>
      <div className="w-1/5">
        <ChevronDownIcon className="w-6" />
      </div>
    </div>
  );
};

export default GroupPicker;
