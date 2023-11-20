import React from "react";
import Sidebar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";

const fileShare = () => {
    return (
        <div className="lg:pl-16 pt-8 lg:pt-0">
        <Sidebar />
            <RightBar />
            <h1 className="text-5xl lg:pt-12 lg:pb-24 flex-col flex items-center">
                Filesharing
            </h1>
        </div>
    )
}
export default fileShare;