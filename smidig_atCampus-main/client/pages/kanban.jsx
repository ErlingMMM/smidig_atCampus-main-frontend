import React from "react";
import Navbar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";
import KanbanElement from "../components/kanban/KanbanElement";

const kanban = () => {
  return (
    <div className="h-screen lg:pl-16 pt-8 lg:pt-0">
      <Navbar currentUrl={"kanban"} />
      <RightBar />
      <KanbanElement />
    </div>
  );
};

export default kanban;
