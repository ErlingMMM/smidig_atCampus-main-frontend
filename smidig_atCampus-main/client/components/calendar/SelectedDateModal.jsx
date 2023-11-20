import React from "react";
import { format, isSameDay } from "date-fns";

const getRelevateEvents = (date, calendarData) => {
  const events = calendarData.events.filter((event) => {
    const start = new Date(
      event.timeframe.start.date + "T" + event.timeframe.start.time
    );
    const end = new Date(
      event.timeframe.end.date + "T" + event.timeframe.end.time
    );
    return isSameDay(date, start) || isSameDay(date, end);
  });
  return events;
};

const SelectedDateModal = ({ data, setData, calendarData }) => {
  const events = getRelevateEvents(data.date, calendarData);

  return (
    <div className={`h-80 w-48 rounded-lg bg-yellow-100`}>
      {/* Header */}
      <div className="flex justify-between items-center bg-yellow-200 p-2">
        <div>{format(data.date, "dd/MM/yyyy")}</div>
        <div
          className="h-6 w-6 rounded-full bg-yellow-50 text-sm flex justify-center items-center cursor-pointer"
          onClick={() => {
            setData({ isOpen: false });
          }}
        >
          X
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center p-4">
        {events.length === 0 && (
          <div className="text-center text-gray-600">
            There are no events on this day
          </div>
        )}
        {events.map((event) => (
          <div className="flex flex-col items-center p-2">{event.title}</div>
        ))}
      </div>
    </div>
  );
};

export default SelectedDateModal;
