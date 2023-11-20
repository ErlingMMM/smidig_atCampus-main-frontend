import React, { useState, useEffect } from "react";
import CalendarViewToggle from "./CalendarViewToggle";
import Dates from "./Dates";

const CalendarElement = ({ calendarData }) => {
  const groupData = [
    {
      id: 1,
      name: "Group 1",
      members: [
        {
          id: 1,
          name: "Member 1",
        },
        {
          id: 2,
          name: "Member 2",
        },
        {
          id: 3,
          name: "Member 3",
        },
        {
          id: 4,
          name: "Member 4",
        },
      ],
    },
    {
      id: 2,
      name: "Group 2",
      members: [
        {
          id: 1,
          name: "Member 1",
        },
        {
          id: 2,
          name: "Member 2",
        },
        {
          id: 3,
          name: "Member 3",
        },
        {
          id: 4,
          name: "Member 4",
        },
      ],
    },
  ];

  const [activeView, setActiveView] = useState("month");

  /* On initial load */
  useEffect(() => {
    /* Set active calendar view */
    if (localStorage.getItem("calendarView")) {
      setActiveView(localStorage.getItem("calendarView"));
    } else {
      setActiveView("month");
    }
  }, []);

  /* On change of active view */
  useEffect(() => {
    localStorage.setItem("calendarView", activeView);
    /* Remove bg from options */
    document.querySelectorAll(".viewBtn").forEach((option) => {
      option.classList.remove("activeView");
    });
    /* Add bg to active view */
    document.querySelector(`#${activeView}Btn`).classList.add("activeView");
  }, [activeView]);

  return (
    <div>
      {/* MOBILE */}
      <div className="lg:hidden inline">MOBILE</div>
      {/* DESKTOP */}
      <div className="hidden lg:inline">
        <div className="flex flex-col justify-center items-center mt-8 w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center w-3/4">
            {/* CALENDAR VIEW TOGGLE BTN */}
            <CalendarViewToggle setActiveView={setActiveView} />
          </div>
          {/* CALENDAR */}
          <Dates activeView={activeView} calendarData={calendarData} />
        </div>
      </div>
    </div>
  );
};

export default CalendarElement;
