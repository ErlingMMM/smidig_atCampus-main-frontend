import React from "react";
import { BellIcon } from "@heroicons/react/solid";

const Activity = ({ data, handleClick }) => {
  return (
    <div>
      <div>
        <h3>Aktivitet</h3>
        <div className="w-full h-0.5 bg-black"></div>
      </div>
      <div className="flex justify-center flex-col space-y-4 mt-4">
        {data.map((item) => (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              handleClick(item);
            }}
            key={item.id}
          >
            <div>
              <BellIcon className="h-4 w-4" />
            </div>
            <div className="font-light text-sm">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
