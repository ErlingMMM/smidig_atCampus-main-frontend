import React, { useState } from "react";
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
  toDate,
  format,
  subMonths,
  addMonths,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import SelectedDateModal from "./SelectedDateModal";

const Dates = ({ activeView, calendarData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateModal, setSelectedDateModal] = useState({
    isOpen: false,
    date: selectedDate,
    posX: 0,
    posY: 0,
  });

  // Generate the dates for the week
  function takeWeek(start = selectedDate) {
    let date = startOfWeek(startOfDay(start), { weekStartsOn: 1 });

    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

  // Generate the dates for the month
  function takeMonth(start = selectedDate) {
    let month = [];
    let date = start;

    function lastDayOfRange(range) {
      return range[range.length - 1][6];
    }

    return function () {
      const weekGen = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());

      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }

      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);

      return range;
    };
  }

  const monthData = takeMonth()();
  const weekData = takeWeek()();

  const isSelected = (day) => {
    if (isSameDay(day, selectedDate)) {
      return "border border-black";
    }
  };

  const isCurrentDay = (day) => {
    if (isSameDay(day, new Date())) {
      return "border border-red-500 ";
    }
  };

  const isInSameMonth = (day) => {
    if (isSameMonth(day, selectedDate)) {
      return "text-black";
    } else {
      return "text-gray-300";
    }
  };

  const filledDates = [];
  calendarData.events.forEach((event) => {
    filledDates.push(toDate(new Date(event.timeframe.start.date)));
  });

  const hasEvent = (day) => {
    if (
      isSameDay(
        day,
        filledDates.find((date) => isSameDay(date, day))
      )
    ) {
      return "bg-yellow-300";
    } else {
      return "bg-gray-200";
    }
  };

  const getMonthName = (monthNr) => {
    switch (monthNr) {
      case 0:
        return "Januar";
        break;
      case 1:
        return "Februar";
        break;
      case 2:
        return "Mars";
        break;
      case 3:
        return "April";
        break;
      case 4:
        return "Mai";
        break;
      case 5:
        return "Juni";
        break;
      case 6:
        return "Juli";
        break;
      case 7:
        return "August";
        break;
      case 8:
        return "September";
        break;
      case 9:
        return "Oktober";
        break;
      case 10:
        return "November";
        break;
      case 11:
        return "Desember";
    }
  };

  const aboveMiddle = (posY) => {
    if (posY < window.innerHeight / 2) {
      return true;
    } else return false;
  };

  return (
    <div className="w-9/12 mt-4 flex flex-col justify-center items-center">
      {/* Print day names */}
      {activeView === "month" && (
        <div className="flex justify-around items-center w-full">
          {["Man", "Tirs", "Ons", "Tors", "Fre", "Lør", "Søn"].map(
            (dayName, index) => (
              <div className="underline text-lg w-1/6 text-center" key={index}>
                {dayName}
              </div>
            )
          )}
        </div>
      )}
      {/* Print month */}
      {activeView === "month" &&
        monthData.map((week, i) => (
          // Print weeks
          <div
            key={i}
            className="flex flex-row w-full justify-around items-center my-2"
          >
            {/* Print days */}
            {week.map((day, j) => (
              <div
                key={j}
                className={`w-1/7 text-center h-8 w-8 rounded-full border flex justify-center items-center p-8 ${isCurrentDay(
                  day
                )} ${hasEvent(day)} ${isSelected(day)}`}
                onClick={() => setSelectedDate(day)}
                onMouseUpCapture={(e) => {
                  setSelectedDateModal({
                    isOpen: true,
                    date: day,
                    posX: e.clientX,
                    posY: e.clientY,
                  });
                }}
              >
                <div className={`text-sm ${isInSameMonth(day)}`}>
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Navigate months buttons */}

      {/* Previous month */}
      <div className="flex items-center justify-center mt-4">
        <div className="p-1 bg-gray-200 rounded-full mx-2">
          <ChevronLeftIcon
            className="h-4 w-4"
            onClick={() => {
              setSelectedDate(subMonths(selectedDate, 1));
            }}
          />
        </div>

        {/* Current month */}
        <div>{getMonthName(selectedDate.getMonth())}</div>

        {/* Next month */}
        <div className="p-1 bg-gray-200 rounded-full mx-2">
          <ChevronRightIcon
            className="h-4 w-4"
            onClick={() => {
              setSelectedDate(addMonths(selectedDate, 1));
            }}
          />
        </div>
      </div>

      {/* Display date details on click */}
      {selectedDateModal.isOpen && (
        <div
          // If the mouse is above the middle of the screen, the modal will be displayed below the mouse, else above
          className={`absolute bg-white rounded-lg shadow-lg transform -translate-x-1/2 ${
            aboveMiddle(selectedDateModal.posY) ? "" : "-translate-y-full"
          }`}
          style={{
            top: selectedDateModal.posY,
            left: selectedDateModal.posX,
          }}
        >
          <SelectedDateModal
            data={selectedDateModal}
            setData={setSelectedDateModal}
            calendarData={calendarData}
          />
        </div>
      )}
    </div>
  );
};

export default Dates;
