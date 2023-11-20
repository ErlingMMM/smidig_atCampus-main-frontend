import React from "react";
import Activity from "./RightBar/Activity";
import Groups from "./RightBar/Groups";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const RightBar = () => {
  const activityData = [
    {
      id: 1,
      title: "Akam added “Refleksjonsnotat v1” to shared files",
      time: "1 hour ago",
      icon: "user-plus",
      link: "#",
    },
    {
      id: 2,
      title: "Erling moved a card from “To Do” to ”Doing” on “Project” kanban",
      time: "1 hour ago",
      icon: "user-plus",
      link: "#",
    },
    {
      id: 3,
      title:
        "Tom Stian changed due date of “Første utkast” from 02.12 to 04.12",
      time: "1 hour ago",
      icon: "user-plus",
      page: "#",
    },
  ];

  const groupsData = [
    {
      id: 1,
      title: "Group 1",
      page: "#",
      members: ["Vaco", "Tom Stian", "Akam", "Simen", "Erling", "Myakhdi"],
    },
    {
      id: 2,
      title: "Group 2",
      page: "#",
      members: ["Vaco", "Tom Stian", "Akam", "Simen", "Erling", "Myakhdi"],
    },
    {
      id: 3,
      title: "Group 3",
      page: "#",
      members: ["Vaco", "Tom Stian", "Akam", "Simen", "Erling", "Myakhdi"],
    },
    {
      id: 4,
      title: "Group 4",
      page: "#",
      members: ["Vaco", "Tom Stian", "Akam", "Simen", "Erling", "Myakhdi"],
    },
    {
      id: 5,
      title: "Group 5",
      page: "#",
      members: ["Vaco", "Tom Stian", "Akam", "Simen", "Erling", "Myakhdi"],
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    console.log("Clicked: ", e.title);
  };

  return (
    <div className="">
      <div
        className={`w-72 bg-yellow-100 h-screen fixed  right-0 flex flex-col px-4 py-8 items-left justify-between transition-all duration-200 transform z-50 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Activity data={activityData} handleClick={handleClick} />
        <Groups data={groupsData} />
        <OpenRightBarBtn open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

const OpenRightBarBtn = ({ open, setOpen }) => {
  return (
    <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 cursor-pointer">
      <div
        className="bg-yellow-100 rounded-md p-2 h-16 flex justify-center items-center"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronRightIcon
            height={32}
            width={32}
            className="transform -translate-x-1"
          />
        ) : (
          <ChevronLeftIcon
            height={32}
            width={32}
            className="transform -translate-x-2"
          />
        )}
      </div>
    </div>
  );
};

export default RightBar;
