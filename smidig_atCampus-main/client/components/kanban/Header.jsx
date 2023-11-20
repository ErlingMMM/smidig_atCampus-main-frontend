import React from "react";
import GroupPicker from "./GroupPicker";

const Header = () => {
  return (
    <div className="w-11/12 h-16 mt-8 bg-yellow-400 rounded-md px-4 flex justify-between">
      <div className="w-full h-full flex items-center space-x-4">
        <GroupPicker title={"Group"} />
        <GroupPicker title={"Board"} />
      </div>
      <div className="flex justify-center items-center">
        <div className="h-3/4 w-16 bg-yellow-200 flex flex-col justify-center items-center rounded-md shadow-md hover:shadow-none cursor-pointer hover:scale-95">
          <p className="text-sm text-center">Legg til kolonne</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
