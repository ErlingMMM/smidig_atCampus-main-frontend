import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Account from "./account";
import Appearance from "./Appearance";
import TermsAndConditions from "./TermsAndConditions";
import Notifications from "./Notifications";
import Report from "./Report";
import Job from "./Job";
import About from "./About";

const Navigation = () => {
  const [printInfo, setPrintInfo] = useState();

  const printComponent = (tag) => {
    switch (tag) {
      case "Min konto":
        return <Account />;
      case "Preferanse":
        return <Appearance />;
      case "Varslinger":
        return <Notifications />;
      case "Personvern":
        return <TermsAndConditions />;
      case "Rapportere":
        return <Report />;
      case "Jobb hos oss":
        return <Job />;
      case "Om atCampus":
        return <About />;
      default:
        break;
    }
  };

  return (
    <>
      <nav className={navClass}>
        <Button
          value="Min konto"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          }
          text="Min konto"
          onClick={() => setPrintInfo("Min konto")}
        />
        <Button
          text="Preferanse"
          value="Preferanse"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          }
          onClick={() => setPrintInfo("Preferanse")}
        />
        <Button
          value="Varslinger"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          }
          text="Varslinger"
          onClick={() => setPrintInfo("Varslinger")}
        />
        <Button
          text="Personvern"
          value="Personvern"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
              />
            </svg>
          }
          onClick={() => setPrintInfo("Personvern")}
        />
        <Button
          text="Rapportere"
          value="Rapportere"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          }
          onClick={() => setPrintInfo("Rapportere")}
        />
        <Button
          text="Jobb hos oss"
          value="Jobb hos oss"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          onClick={() => setPrintInfo("Jobb hos oss")}
        />
        <Button
          text="Om atCampus"
          value="Om atCampus"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          }
          onClick={() => setPrintInfo("Om atCampus")}
        />
      </nav>
      {printComponent(printInfo)}
    </>
  );
};

const navClass =
  "w-full flex flex-wrap md:w-1/5 flex-col pt-12 md:pl-12 md:-mb-24 mr-6";
const liclass =
  "bg-indigo-500 z-10 hover:text-gray-300 no-underline mb-1 hover:underline font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900";
Navigation.protoTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Navigation.defaultProps = {
  text: "",
};

export default Navigation;
