import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../stores/atoms";
import loadingGif from "../public/gifs/results_loading.gif";
import Image from "next/image";
import Navbar from "../components/global/Navbar";
import InfoModal from "../components/global/Modal/InfoModal";
import { InformationCircleIcon } from "@heroicons/react/solid";

const results = () => {
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);
  const userToken = useRecoilValue(tokenState);
  let resultToken = "";
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [isOpen, setOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const user = useRecoilValue(userState);
  const [surveyeeId, setSurveyeeId] = useState(null);

  //Get the result token from the url
  if (typeof window != "undefined") {
    if (window.location.search != "") {
      resultToken = window.location.search.split("=")[1];
    } else {
      // If no token is found, redirect to the matching page
      window.location.href = "/matching";
    }
  }

  //Fetch matching groups using resultToken
  const fetchResults = async () => {
    const response = await fetch(
      `https://copia.dev/api/survey/getsurveymatches?surveyId=${resultToken}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );
    const { surveyeeId, matches } = await response.json();
    // Sort the results by the match percentage
    matches.sort((a, b) => {
      return b.matchPercentage - a.matchPercentage;
    });
    setResults(matches);
    setSurveyeeId(surveyeeId);
  };

  useEffect(() => {
    if (userToken != "") {
      fetchResults();
    }
  }, [userToken]);

  //If results are ready, set loading to false
  useEffect(() => {
    if (results != null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [results]);

  useEffect(() => {
    if (selectedGroup != null) {
      setJoinModalOpen(true);
    }
  }, [selectedGroup]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-col overflow-x-hidden">
        <div className="flex justify-center flex-col items-center space-y-2 mt-8">
          <h1 className="text-3xl">Dette er dine resultater</h1>
          <div className="h-0.5 bg-gray-700 w-[150%]" />
          <p>Velg en gruppe du vil kontakte</p>
        </div>
        {isLoading ? (
          loadingModal()
        ) : (
          <div className="w-screen flex flex-col justify-center items-center">
            {results.length > 0 ? (
              results.map((result) => {
                if (result.members) {
                  return (
                    <GroupCard
                      group={result}
                      active={active}
                      setActive={setActive}
                      setSelectedGroup={setSelectedGroup}
                    />
                  );
                } else {
                  return (
                    <UserCard
                      resultUser={result}
                      active={active}
                      setActive={setActive}
                      setSelectedGroup={setSelectedGroup}
                      isOpen={isOpen}
                      setInfoOpen={setInfoOpen}
                      isInfoOpen={isInfoOpen}
                      setOpen={setOpen}
                    />
                  );
                }
              })
            ) : (
              <div className="flex justify-center items-center">
                <div className="text-xl">Ingen resultater funnet</div>
              </div>
            )}
          </div>
        )}
        {selectedGroup ? (
          <JoinModal
            open={joinModalOpen}
            setOpen={setJoinModalOpen}
            subject={selectedGroup}
            setSubject={setSelectedGroup}
            user={user}
            token={userToken}
            surveyeeId={surveyeeId}
          />
        ) : null}
      </div>
    </>
  );
};

const UserCard = ({
  resultUser,
  active,
  setActive,
  setSelectedGroup,
  setOpen,
  isInfoOpen,
  setInfoOpen,
  isOpen,
}) => {
  return (
    <div className="w-full max-w-6xl m-auto p-4 relative text-black my-8">
      {/* Header */}
      <div
        className={`flex justify-between items-center cursor-pointer space-x-8 bg-yellow-400 relative px-16 pr-32 h-24 shadow-lg ${
          active === resultUser.id ? "rounded-t-lg" : "rounded-lg"
        } transistion-all duration-50`}
        onClick={() => {
          if (active !== resultUser.id) {
            setActive(resultUser.id);
          } else {
            setActive(null);
          }
        }}
      >
        {/* Left */}
        <div className="text-2xl">{resultUser.name}</div>
        {/* Result match_percentage */}
        <div
          className="w-36 h-36 rounded-full absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center shadow-md "
          style={{
            background: `conic-gradient(rgb(167, 139, 250) 0deg, rgb(205, 189, 255) ${
              resultUser.matchPercentage * 3.6
            }deg, #f5f5f5 ${resultUser.matchPercentage * 3.6}deg)`,
          }}
        >
          <div
            className={`w-28 h-28 rounded-full bg-white flex justify-center items-center text-2xl font-bold text-purple-400 shadow-inner`}
          >
            <div>{resultUser.matchPercentage + "%"}</div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div
        className={`${
          active === resultUser.id ? "h-[36rem]" : "h-0"
        } w-full bg-yellow-100 transition-height duration-150 ease-in-out rounded-b-lg overflow-hidden flex flex-col justify-center items-center`}
      >
        {/* Content */}
        <div className="flex justify-center items-start w-full h-full p-4 space-x-4">
          {/* left */}
          <div className="w-3/4 flex flex-col justify-between space-y-4">
            {/* Spesifikasjoner */}
            <div>
              {/* header */}
              <div className="font-bold bg-yellow-400 p-2 flex justify-center items-center rounded-t-md ">
                Søkekriterier
              </div>
              {/* Content */}
              <div className="h-full bg-yellow-50 grid grid-cols-2 gap-4 p-4 rounded-b-md">
                {resultUser.questionAnswers.map((question) => {
                  return (
                    <div className="flex flex-col justify-center items-center text-sm text-center">
                      <div className="font-bold">{question.description}</div>
                      <div>{question.answer}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Bio */}
            <div>
              {/* header */}
              <div className="font-bold bg-yellow-400 p-2 flex justify-center items-center rounded-t-md">
                Om meg
              </div>
              {/* Content */}
              <div className="h-full bg-yellow-50 flex flex-col justify-start items-start p-4 rounded-b-md">
                <p>{resultUser.about}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact btn */}
        <div className="flex justify-around items-center w-full">
          <button
            className="px-4 py-2 font-bold text-xl bg-yellow-400 rounded-md mb-4 hover:scale-95 transition-all duration-75"
            onClick={() => {
              setSelectedGroup(resultUser);
            }}
          >
            Inviter til gruppen
          </button>
        </div>
        <button onClick={() => setInfoOpen(true)}>
          {" "}
          <InformationCircleIcon className="h-8 w-8   text-[#6664AC] hover:text-[#514eaa]" />
        </button>
        <InfoModal setOpen={setInfoOpen} isOpen={isInfoOpen} info={"results"} />
      </div>
    </div>
  );
};

const GroupCard = ({
  group,
  active,
  setActive,
  setSelectedGroup,
  setInfoOpen,
  isInfoOpen,
}) => {
  const handleJoinGroup = () => {
    setSelectedGroup(group);
  };

  return (
    <div
      className="w-full max-w-6xl m-auto p-4 relative text-black my-8"
      key={group.id}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center cursor-pointer space-x-8 pr-32 h-24 bg-yellow-400 relative px-16 shadow-lg ${
          active === group.id ? "rounded-t-lg" : "rounded-lg"
        } transistion-all duration-50`}
        onClick={() => {
          if (active === group.id) {
            setActive(null);
          } else {
            setActive(group.id);
          }
        }}
      >
        {/* Left */}
        <div className="flex items-center space-x-4">
          {/* image */}
          <div className="rounded-full bg-gray-400 h-16 w-16"></div>
          {/* name */}
          <h2 className="text-2xl">{group.name}</h2>
        </div>
        {/* Right */}
        <div className="flex justify-center items-center">
          {/* Members */}
          <div className="flex items-center justify-center flex-col">
            <UserIcon className="h-6 w-6" />
            {group.members.length} /{" "}
            {group.members.length +
              parseInt(
                group.questionAnswers.find(
                  (answer) =>
                    answer.description ===
                    "Hvor mange nye medlemmer trenger dere?"
                ).answer
              )}
          </div>
        </div>
        {/* Result match_percentage */}
        <div
          className="w-36 h-36 rounded-full absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center shadow-md "
          style={{
            background: `conic-gradient(rgb(167, 139, 250) 0deg, rgb(205, 189, 255) ${
              group.matchPercentage * 3.6
            }deg, #f5f5f5 ${group.matchPercentage * 3.6}deg)`,
          }}
        >
          <div
            className={`w-28 h-28 rounded-full bg-white flex justify-center items-center text-2xl font-bold text-purple-400 shadow-inner`}
          >
            <div>{group.matchPercentage + "%"}</div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div
        className={`${
          active === group.id ? "h-[36rem]" : "h-0"
        } w-full bg-yellow-100 transition-height duration-150 ease-in-out rounded-b-lg overflow-hidden flex flex-col justify-center items-center`}
      >
        {/* Content */}
        <div className="flex justify-center items-start w-full h-full p-4 space-x-4">
          {/* left */}
          <div className="w-3/4 flex flex-col justify-between space-y-4">
            {/* Spesifikasjoner */}
            <div>
              {/* header */}
              <div className="font-bold bg-yellow-400 p-2 flex justify-center items-center rounded-t-md ">
                Søkekriterier
              </div>
              {/* Content */}
              <div className="h-full bg-yellow-50 grid grid-cols-2 gap-4 p-4 rounded-b-md">
                {group.questionAnswers.map((question) => {
                  return (
                    <div className="flex flex-col justify-center items-center text-sm text-center">
                      <div className="font-bold">{question.description}</div>
                      <div>{question.answer}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Bio */}
            <div>
              {/* header */}
              <div className="font-bold bg-yellow-400 p-2 flex justify-center items-center rounded-t-md">
                Om oss
              </div>
              {/* Content */}
              <div className="h-full bg-yellow-50 flex flex-col justify-start items-start p-4 rounded-b-md">
                <p>{group.description}</p>
              </div>
            </div>
          </div>
          {/* right */}
          {/* Members */}
          <div className="w-1/4">
            {/* Header */}
            <div className="font-bold bg-yellow-400 p-2 flex justify-center items-center rounded-t-md">
              Medlemmer
            </div>
            {/* Member list */}
            <ul className="h-full bg-yellow-50 flex flex-col justify-start items-start p-4 rounded-b-md">
              {group.members.map((member, index) => (
                <li className="" key={index}>
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Contact btn */}
        <div className="flex justify-around items-center w-full">
          <button
            className="px-4 py-2 font-bold text-xl bg-yellow-400 rounded-md mb-4 hover:scale-95 transition-all duration-75"
            onClick={() => {
              handleJoinGroup(group.id);
            }}
          >
            Bli med i gruppe
          </button>
        </div>
        <button onClick={() => setInfoOpen(true)}>
          {" "}
          <InformationCircleIcon className="h-8 w-8   text-[#6664AC] hover:text-[#514eaa]" />
        </button>
        <InfoModal setOpen={setInfoOpen} isOpen={isInfoOpen} info={"results"} />
      </div>
    </div>
  );
};

const JoinModal = ({
  isOpen,
  setOpen,
  subject,
  setSubject,
  user,
  token,
  surveyeeId,
}) => {
  const [message, setMessage] = useState("");
  const handleExit = () => {
    setSubject(null);
    setOpen(false);
  };
  const handleSendRequest = (subject, message) => {
    if (subject.memberLimit) {
      const res = fetch(`https://copia.dev/api/colloquium/createjoinrequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          colloquiumId: subject.id,
          message: message,
        }),
      });

      res
        .then((res) => {
          if (res.ok) {
            alert("Du har sendt en forespørsel");
            setOpen(false);
            window?.location.reload();
          } else {
            console.log(res);
            alert("Noe gikk galt");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const res = fetch(`https://copia.dev/api/Colloquium/CreateInvite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          colloquiumId: surveyeeId,
          userId: subject.id,
          message: message,
        }),
      });

      res
        .then((res) => {
          if (res.ok) {
            alert("Du har sendt en forespørsel");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("Sending request to group: " + subject.name);

    //If its a group sending a request to user, use a different endpoint (createInvite)
  };
  return (
    <div
      className={`${
        !isOpen ? "block" : "hidden"
      } flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto`}
    >
      {/* Content */}
      <div className="w-[40rem] h-[32rem] bg-white z-20 rounded-lg p-4 flex flex-col justify-start items-center">
        {/* Title */}
        <div className="flex justify-center items-center flex-col">
          <p className="font-bold text-lg">
            Send medlemsforespørsel til {subject.name}
          </p>
          <div className="bg-black w-[130%] h-0.5"></div>
        </div>
        {/* Message input */}
        <div className="w-full h-full flex flex-col justify-center items-center">
          <textarea
            className="w-full h-full p-4 bg-gray-100 rounded-md my-2"
            placeholder="Skriv en melding..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="flex justify-center items-center space-x-8">
            <button
              className="px-4 py-2 font-bold text-xl bg-yellow-400 rounded-md mb-4 hover:scale-95 transition-all duration-75"
              onClick={() => {
                handleExit();
              }}
            >
              Avbryt
            </button>
            <button
              className="px-4 py-2 font-bold text-xl bg-yellow-400 rounded-md mb-4 hover:scale-95 transition-all duration-75"
              onClick={() => {
                handleSendRequest(subject, message);
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className="absolute w-screen h-screen left-0 top-0 bg-[rgba(0,0,0,0.7)] z-10"
        onClick={handleExit}
      ></div>
    </div>
  );
};

const loadingModal = () => {
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.75)] flex justify-center items-center absolute left-0 top-0">
      <div className="h-1/2 w-[32rem] bg-[rgb(247,247,247)] rounded-xl flex justify-between items-center py-8 px-4 flex-col">
        <div>
          <Image className="h-full w-full" src={loadingGif} />
        </div>
        <p className="text-2xl font-bold text-center">
          Vi henter dine beste resultater...
        </p>
      </div>
    </div>
  );
};

export default results;
