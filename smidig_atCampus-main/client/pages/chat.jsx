import React from "react";
import Sidebar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";
import { useRecoilValue } from "recoil";
import { userState } from "../stores/atoms";

const chat = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="lg:pl-16 pt-8 lg:pt-0">
      <Sidebar />
      <RightBar />
      <div className="text-5xl lg:pt-12 lg:pb-24 flex-col flex items-center">
        <h1>CHAT</h1>
        <h1>user</h1>
        <pre>{JSON.stringify(user)}</pre>
      </div>
    </div>
  );
};
export default chat;
