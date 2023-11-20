import React from "react";
import {
  HomeIcon,
  ClipboardListIcon,
  CalendarIcon,
  UserGroupIcon,
  CogIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useState } from "react";
import { makeLogo } from "../../utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeGroupSelector,
  groupsState,
  activeGroupIdState,
} from "../../stores/atoms";
import { LogoutIcon } from "@heroicons/react/solid";

const Navbar = ({ currentUrl }) => {
  const [active, setActive] = useState(false);
  const activeGroup = useRecoilValue(activeGroupSelector);

  const logout = () => {
    if (typeof window != "undefined") {
      window.localStorage.removeItem("user-token");
      window.location.reload();
    }
  };

  return (
    <div>
      <div
        className="hidden lg:inline"
        onMouseEnter={() => {
          setActive(true);
        }}
        onMouseLeave={() => {
          setActive(false);
        }}
      >
        <div
          className={`fixed left-0 ${
            currentUrl === "matching" ? "bg-[#fae5bb]" : "bg-yellow-400"
          } h-screen flex flex-col pl-4 overflow-hidden justify-between py-4 transition-all duration-100 ease-out`}
          style={active ? { width: "200px" } : { width: "64px" }}
        >
          {/* Group selector */}
          {activeGroup ? (
            <div className="flex gap-4 items-center relative cursor-pointer">
              <div className="rounded-full h-8 w-8 bg-black text-white text-xs flex justify-center items-center absolute">
                {makeLogo(activeGroup.name)}
              </div>
              <div className=" ml-14 whitespace-nowrap">
                <GroupSelector />
              </div>
            </div>
          ) : null}
          {/* Navbar links */}
          <div className="flex flex-col h-72 justify-around">
            <Link href="/">
              <div
                className={`flex gap-4 items-center relative  ${
                  currentUrl === "index"
                    ? "opacity-50"
                    : "hover:text-red-500 cursor-pointer  hover:scale-95"
                }`}
              >
                <HomeIcon height="32" width="32" className="absolute" />
                <p className={`ml-12 font-bold mt-1`}>Hjem</p>
              </div>
            </Link>

            <Link href="/calendar">
              <div
                className={`flex gap-4 items-center relative  ${
                  currentUrl === "calendar"
                    ? "opacity-50"
                    : "hover:text-red-500 cursor-pointer  hover:scale-95"
                }`}
              >
                <CalendarIcon height="32" width="32" className="absolute" />
                <p className="ml-12 font-bold mt-1">Kalender</p>
              </div>
            </Link>
            <Link href="/kanban">
              <div
                className={`flex gap-4 items-center relative  ${
                  currentUrl === "kanban"
                    ? "opacity-50"
                    : "hover:text-red-500 cursor-pointer  hover:scale-95"
                }`}
              >
                <ClipboardListIcon
                  height="32"
                  width="32"
                  className="absolute"
                />
                <p className="ml-12 font-bold mt-1">Kanban</p>
              </div>
            </Link>
          </div>
          {/* User info links*/}
          <div className="flex flex-col h-36 justify-around">
            <Link href="/groups">
              <div
                className={`flex gap-4 items-center relative  ${
                  currentUrl === "/groups"
                    ? "opacity-50"
                    : "hover:text-red-500 cursor-pointer  hover:scale-95"
                }`}
              >
                <UserGroupIcon height="32" width="32" className="absolute" />
                <p className="ml-12 font-bold mt-1">Kollekvier</p>
              </div>
            </Link>
            <Link href="/settings">
              <div
                className={`flex gap-4 items-center relative  ${
                  currentUrl === "settings"
                    ? "opacity-50"
                    : "hover:text-red-500 cursor-pointer  hover:scale-95"
                }`}
              >
                <CogIcon height="32" width="32" className="absolute" />
                <p className="ml-12 font-bold mt-1">Innstillinger</p>
              </div>
            </Link>
            <button
              className={`flex gap-4 pl-1 items-center relative cursor-pointer  hover:scale-95 hover:text-red-500 `}
              text="Logg ut"
              value="logout"
              onClick={() => logout()}
            >
              {" "}
              {<LogoutIcon height="32" width="32" className="absolute" />}
              <p className="ml-12 font-bold mt-1"> Logg ut</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupSelector = () => {
  const groups = useRecoilValue(groupsState);
  const activeGroup = useRecoilValue(activeGroupSelector);
  const activeGroupId = useSetRecoilState(activeGroupIdState);

  const handleChange = (e) => {
    if (typeof window != "undefined") {
      window.localStorage.setItem(
        "activeGroup",
        groups.find((g) => g.name == e.target.value).id
      );
    }
    activeGroupId(groups.find((group) => group.name === e.target.value).id);
  };

  return (
    <div className="group-select pr-4">
      <select
        className="w-full bg-yellow-200 rounded-md p-2 focus:outline-none"
        onChange={(e) => handleChange(e)}
      >
        {groups.map((group) => (
          <option
            key={group.id}
            className="text-xs"
            selected={group.name === activeGroup.name}
          >
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Navbar;
