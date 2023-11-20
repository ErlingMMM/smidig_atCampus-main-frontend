import {
  ChatAlt2Icon,
  PlusCircleIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import React from "react";

const Whiteboard = () => {
  const kanBanData = {
    columns: [
      {
        id: "1",
        title: "To Do",
        cards: [
          {
            id: "1",
            title: "Write a script for the interviews",
            description:
              "Follow the guide set by Jake Knapp.You should have recieved it on mail, sent by Emil. so you can follow the guide. If you haven't, please do so. If you have, please follow the guide. ",
            importance: "medium",
            assignee: ["Member 1", "Member 2"],
            created: "2020-01-01",
          },
          {
            id: "2",
            title: "Ride the bike",
            description:
              "Follow the guide set by Jake Knapp.You should have recieved it on mail, sent by Emil. so you can follow the guide. If you haven't, please do so. If you have, please follow the guide. ",
            importance: "high",
            assignee: ["Member 1", "Member 4"],
            created: "2020-01-01",
          },
        ],
      },
      {
        id: "2",
        title: "In Progress",
        cards: [
          {
            id: "2",
            title: "Card 2",
            description: "Description 2",
            importance: "medium",
            assignee: ["Member 2"],
            created: "2020-01-01",
          },
        ],
      },
      {
        id: "3",
        title: "Done",
        cards: [
          {
            id: "3",
            title: "Card 3",
            description: "Description 3",
            importance: "high",
            assignee: ["Member 3"],
            created: "2020-01-01",
          },
        ],
      },
    ],
  };

  return (
    <div className="mt-4 w-11/12 flex justify-around space-x-8">
      {kanBanData.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          nrOfColumns={kanBanData.columns.length}
        />
      ))}
    </div>
  );
};

const Column = ({ column, nrOfColumns }) => {
  return (
    <div
      className={`w-1/${nrOfColumns} flex items-center rounded-md flex-col shadow-md`}
    >
      <div className="py-4">{column.title}</div>
      <div className="w-full flex justify-center items-center flex-col space-y-2">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <Toolbar />
    </div>
  );
};

const Card = ({ card }) => {
  const makeMemberIcon = (memberName) => {
    return memberName
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  return (
    <div className="w-11/12 h-24 max-h-64 rounded-md bg-yellow-100 flex justify-between flex-col overflow-hidden">
      <div
        className={`w-full h-2 ${
          card.importance === "low"
            ? "bg-green-300"
            : card.importance === "medium"
            ? "bg-yellow-300"
            : card.importance === "high"
            ? "bg-red-300"
            : "bg-green-300"
        }`}
      ></div>
      <div className="p-2">{card.title}</div>
      <div className="p-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-0.5">
            <ChatAlt2Icon className="h-4" />
            <p className="text-sm">6</p>
          </div>
          <div className="flex items-center space-x-0.5">
            <ThumbUpIcon className="h-4" />
            <p className="text-sm">2</p>
          </div>
        </div>
        <div className="flex space-x-1">
          {card.assignee.map((member) => (
            <div className="flex items-center bg-gray-300 rounded-full p-1 text-xs">
              {makeMemberIcon(member)}
            </div>
          ))}
          <div className="flex items-center border-2 border-gray-300 rounded-full p-1 text-xs h-6 w-6">
            <PlusIcon className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Toolbar = () => {
  return (
    <div className="p-4 text-sm text-gray-500 flex space-x-2 items-center cursor-pointer">
      <p>Legg til gjøremål</p>
      <PlusCircleIcon className="h-4" />
    </div>
  );
};

export default Whiteboard;
