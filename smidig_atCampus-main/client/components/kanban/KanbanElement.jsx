import { PlusIcon } from "@heroicons/react/outline";
import React from "react";
import Header from "./Header";
import Whiteboard from "./Whiteboard";

const KanbanElement = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Header />
      <Whiteboard />
    </div>
  );
};

export default KanbanElement;
