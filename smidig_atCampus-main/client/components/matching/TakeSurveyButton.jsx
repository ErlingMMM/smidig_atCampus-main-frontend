import React from "react";
import Link from "next/link";

const TakeSurveyButton = ({ scope }) => {
  function onGroupSurvey() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("groupSurvey", "group");
    }
  }

  function onSingleSurvey() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("groupSurvey", "single");
    }
  }

  function onCreateSurvey() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("groupSurvey", "create");
    }
  }

  if (scope === "user") {
    return (
      <Link href="/matching-survey">
        <button
          onClick={onSingleSurvey}
          className="bg-[#6664AC] pt-3 pb-3 pl-14 pr-14 rounded shadow border text-white hover:text-[#f79256] hover:scale-95"
        >
          Kom i gang
        </button>
      </Link>
    );
  } else if (scope === "group") {
    return (
      <Link href="/matching-survey">
        <button
          onClick={onGroupSurvey}
          className="bg-[#6664AC] pt-3 pb-3 pl-14 pr-14 rounded shadow border text-white hover:text-[#f79256] hover:scale-95"
        >
          Kom i gang
        </button>
      </Link>
    );
  } else if (scope === "create") {
    return (
      <Link href="/matching-survey">
        <button
          onClick={onCreateSurvey}
          className="bg-[#6664AC] pt-3 pb-3 pl-14 pr-14 rounded shadow border text-white hover:text-[#f79256] hover:scale-95"
        >
          Kom i gang
        </button>
      </Link>
    );
  }
};

export default TakeSurveyButton;
