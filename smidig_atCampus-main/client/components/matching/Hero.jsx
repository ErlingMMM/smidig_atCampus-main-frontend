import React from "react";
import TimeManagement from "../../public/svg/undraw_time_management.svg";
import Booked from "../../public/svg/undraw_booked.svg";
import WorkingLate from "../../public/svg/undraw_working_late.svg";
import Education from "../../public/svg/undraw_education.svg";
import Conversation from "../../public/svg/undraw_conversation.svg";
import Events from "../../public/svg/undraw_events.svg";
import Winners from "../../public/svg/undraw_winners.svg";
import Choose from "../../public/svg/undraw_choose.svg";
import TextField from "../../public/svg/undraw_text_field.svg";
import Team from "../../public/svg/undraw_team.svg";
import Link from "../../public/svg/undraw_link.svg";
import Name from "../../public/svg/undraw_short_bio.svg";
import AboutUs from "../../public/svg/undraw_about_us_page.svg";
import Split from "../../public/svg/undraw_split.svg";

const Hero = ({ currentQuestion }) => {
  let surveyMode = "";
  if (typeof window !== "undefined") {
    const sessionData = sessionStorage.getItem("groupSurvey");
    if (sessionData === "group") {
      surveyMode = "group";
    }
    if (sessionData === "create") {
      surveyMode = "create";
    }
  }

  const printPicture = () => {
    let thisQuestion = currentQuestion;

    if (surveyMode === "group") {
      thisQuestion -= 3;
    }

    const firstDefaultQuestion = () => {
      if (surveyMode === "group") {
        return <Link />;
      } else {
        return <Education />;
      }
    };

    switch (thisQuestion) {
      case -3:
        return <Choose />;
      case -2:
        return <TextField />;
      case -1:
        return <Team />;
      case 0:
        return firstDefaultQuestion();
      case 1:
        return <Booked />;
      case 2:
        return <TimeManagement />;
      case 3:
        return <WorkingLate />;
      case 4:
        return <Conversation />;
      case 5:
        return <Events />;
      case 6:
        return <Winners />;
      default:
        break;
    }
  };

  const printPictureCreate = () => {
    switch (currentQuestion) {
      case 0:
        return <Name />;
      case 1:
        return <AboutUs />;
      case 2:
        return <Split />;
      case 3:
        return <Team />;
      case 4:
        return <Education />;
      case 5:
        return <Winners />;
      default:
        break;
    }
  };

  return (
    <div className="h-2/6">
      <div className="hidden lg:inline">
        <div className="flex justify-center items-center h-full w-full   bg-blue-900">
          <div className="flex  scale-[0.35]">
            {surveyMode === "create" ? (
              <>{printPictureCreate()}</>
            ) : (
              <>{printPicture()}</>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
