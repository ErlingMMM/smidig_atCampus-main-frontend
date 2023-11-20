import React, { useContext, useEffect } from "react";
import CalendarElement from "../components/calendar/CalendarElement";
import UpcomingEvents from "../components/calendar/UpcomingEvents";
import Sidebar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";

const calendar = () => {
  const calendarData = {
    events: [
      {
        id: 1,
        title: "Event 1",
        timeframe: {
          start: {
            date: "2022-05-17",
            time: "10:00",
          },
          end: {
            date: "2022-05-17",
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
            date: "2022-05-27",
            time: "10:00",
          },
          end: {
            date: "2022-05-27",
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
            date: "2022-05-31",
            time: "10:00",
          },
          end: {
            date: "2022-05-31",
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
      <Sidebar currentUrl={"calendar"} />
      <RightBar />
      <UpcomingEvents data={calendarData} />
      <CalendarElement calendarData={calendarData} />
    </div>
  );
};

export default calendar;
