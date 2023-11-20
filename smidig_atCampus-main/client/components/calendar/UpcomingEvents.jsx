import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

const UpcomingEvents = ({ data }) => {
  return (
    <div>
      <div className="lg:hidden inline">
        <div className="h-48 w-48 bg-red-500"></div>
      </div>
      {/* DESKTOP */}
      <div className="hidden lg:inline">
        <div className="flex justify-center items-center pt-8 flex-col">
          <h2 className="underline text-xl">Kommende hendelser</h2>
          <div className="lg:w-1/2 w-8/12 h-32 mt-4 rounded-md overflow-hidden flex">
            <div className="w-4/12 h-full bg-yellow-200 flex flex-col justify-between items-center pb-6">
              <h1 className="text-center pt-2 text-xl">
                {data.events[0].title}
              </h1>
              <div className="flex items-center w-full mt-2">
                <CalendarIcon height="20px" width="20px" className="mx-4" />
                <p className="text-sm">{data.events[0].timeframe.start.date}</p>
              </div>
              <div className="flex items-center w-full mt-2">
                <ClockIcon height="20px" width="20px" className="mx-4" />
                <p className="text-sm">{data.events[0].timeframe.start.time}</p>
              </div>
              <div className="flex items-center w-full mt-2">
                <LocationMarkerIcon
                  height="20px"
                  width="20px"
                  className="mx-4"
                />
                <p className="text-sm">{data.events[0].location}</p>
              </div>
            </div>
            <div className="w-4/12 h-full bg-yellow-300 flex flex-col justify-between items-center pb-6">
              <h1 className="text-center pt-2 text-xl">
                {data.events[1].title}
              </h1>
              <div className="flex items-center w-full mt-2">
                <CalendarIcon height="20px" width="20px" className="mx-4" />
                <p className="text-sm">{data.events[1].timeframe.start.date}</p>
              </div>
              <div className="flex items-center w-full mt-2">
                <ClockIcon height="20px" width="20px" className="mx-4" />
                <p className="text-sm">{data.events[1].timeframe.start.time}</p>
              </div>
              <div className="flex items-center w-full mt-2">
                <LocationMarkerIcon
                  height="20px"
                  width="20px"
                  className="mx-4"
                />
                <p className="text-sm">{data.events[1].location}</p>
              </div>
            </div>
            <div className="w-4/12 h-full bg-yellow-400 flex flex-col justify-between items-center pb-6">
              <h1 className="text-center pt-2 text-xl">
                {data.events[2].title}
              </h1>
              <div className="flex items-center w-full mt-2">
                <CalendarIcon height="20px" width="20px" className="mx-4" />
                <p className="text-sm">{data.events[2].timeframe.start.date}</p>
              </div>
              <div className="flex items-center w-full mt-2">
                <ClockIcon height="20px" width="20px" className="mx-4" />
                <p className="text-sm">{data.events[2].timeframe.start.time}</p>
              </div>
              <div className="flex items-center w-full mt-2">
                <LocationMarkerIcon
                  height="20px"
                  width="20px"
                  className="mx-4"
                />
                <p className="text-sm">{data.events[2].location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
