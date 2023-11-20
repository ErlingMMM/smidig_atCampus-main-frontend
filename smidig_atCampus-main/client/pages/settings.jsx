import React from "react";
import Sidebar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";
import Header from "../components/settings/Header";
import Navigation from "../components/settings/Navigation";

const settings = () => {
  return (
    <div className="lg:pl-16 pt-8 lg:pt-0">
      <Sidebar currentUrl={"settings"} />
      <RightBar />
      <Header />
      <div className="flex ml-28 ">
        <Navigation />
      </div>
    </div>
  );
};
export default settings;
