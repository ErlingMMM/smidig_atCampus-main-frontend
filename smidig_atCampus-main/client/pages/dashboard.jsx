import React from "react";
import Sidebar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";
import UpcomingEvents from "../components/calendar/UpcomingEvents";
import KanbanElement from "../components/kanban/KanbanElement";

const dashboard = () => {
  const calendarData = {
    events: [
      {
        id: 1,
        title: "Event 1",
        timeframe: {
          start: {
            date: "2021-12-09",
            time: "10:00",
          },
          end: {
            date: "2021-12-09",
            time: "11:00",
          },
        },
        location: "Location 1",
        description: "Description 1",
      },
      {
        id: 2,
        title: "Event 2",
        timeframe: {
          start: {
            date: "2021-12-24",
            time: "10:00",
          },
          end: {
            date: "2021-12-24",
            time: "15:00",
          },
        },
        location: "Location 2",
        description: "Description 2",
      },
      {
        id: 3,
        title: "Event 3",
        timeframe: {
          start: {
            date: "2021-12-29",
            time: "10:00",
          },
          end: {
            date: "2021-12-29",
            time: "15:00",
          },
        },
        location: "Location 3",
        description: "Description 3",
      },
    ],
  };
  return (
    <div className="lg:pl-16 pt-8 lg:pt-0">
      <Sidebar />
      <RightBar />
      <h1 className="text-5xl lg:pt-12 lg:pb-24 flex-col flex items-center">
        SMIDIG PROSJEKT
      </h1>
      <UpcomingEvents data={calendarData} />
      <h1 className="text-xl lg:pt-12 flex-col flex items-center underline">
        Kanban
      </h1>
      <KanbanElement />
    </div>
  );
};

export default dashboard;
