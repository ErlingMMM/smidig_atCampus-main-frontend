import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { UserRemoveIcon, PencilAltIcon } from "@heroicons/react/outline";
import { makeLogo } from "../../utils";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../stores/atoms";
import Link from "next/link";

const GroupList = ({ data, activeGroup }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-9/12 mt-4 space-y-4">
        {data.map((group, index) => {
          const [isOpen, setIsOpen] = useState(false);
          const nrOfMembers = (group.members || []).length;
          const membersArray = group.members || [];
          const [search, setSearch] = useState(null);
          const token = useRecoilValue(tokenState);
          const [openRequest, setOpenRequest] = useState(false);
          const [requests, setRequests] = useState();
          const [isLoading, setIsLoading] = useState(false);
          const [groupSurveys, setGroupSurveys] = useState();
          const [isAdmin, setIsAdmin] = useState(false);

          const handleOpenRequest = () => {
            setOpenRequest(true);
          };

          //Fetch search
          const fetchSearch = async () => {
            const response = await fetch(
              `https://copia.dev/api/survey/getallcompletedsurveys?surveyeeId=${group.id}`,
              {
                method: "GET",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            setSearch(data);
          };

          const fetchRequests = async () => {
            const res = await fetch(
              `https://copia.dev/api/colloquium/getalljoinrequests?colloquiumId=${group.id}`,
              {
                method: "GET",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            const data = await res.json();
            setRequests(data);
          };

          const fetchSurveys = async () => {
            const res = await fetch(
              `https://copia.dev/api/survey/getallcompletedsurveys?surveyeeId=${group.id}`,
              {
                method: "GET",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            const data = await res.json();
            setGroupSurveys(data);
          };

          useEffect(() => {
            if (token) {
              fetchSearch();
              if (group.role === "Administrator") {
                fetchRequests();
                fetchSurveys();
                setIsAdmin(true);
              }
              if (group.id === activeGroup) {
                setIsOpen(true);
              }
            }
          }, [token]);

          const handleDeleteColloquium = async (id) => {
            const res = await fetch(
              `https://copia.dev/api/colloquium/delete?colloquiumId=${id}`,
              {
                method: "DELETE",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            const status = await res.status;
            if (status === 204) {
              window.location.reload();
            } else {
              alert("Something went wrong");
            }
          };

          const handleLeave = async (id) => {
            const res = await fetch(
              `https://copia.dev/api/colloquium/leave?colloquiumId=${id}`,
              {
                method: "DELETE",
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            const status = await res.status;
            if (status === 204) {
              window.location.reload();
            } else {
              alert("Something went wrong");
            }
          };

          return (
            <div key={index}>
              <div
                className={`w-full h-24 bg-yellow-400 ${
                  isOpen ? "rounded-t-md" : "rounded-md"
                } px-16 flex justify-between items-center cursor-pointer`}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-16 w-16 rounded-full flex justify-center items-center bg-white`}
                  >
                    {makeLogo(group.name)}
                  </div>
                  <div>{group.name}</div>
                </div>
                {group ? (
                  <div>
                    <div className="flex flex-col items-center space-y-1">
                      <UserIcon className="h-6" />
                      <div>{`${nrOfMembers}`}</div>
                    </div>
                  </div>
                ) : (
                  <div>No data</div>
                )}
              </div>
              <div
                style={{ display: `${isOpen ? "grid" : "none"}` }}
                className="grid-cols-3 p-4 space-x-4 bg-yellow-100 rounded-b-md"
              >
                <div className="col-span-2">
                  <div className="relative">
                    <div className="w-full bg-yellow-400 h-8 rounded-t-md flex justify-center items-center text-lg">
                      <div className="">Generell info</div>
                      {isAdmin ? (
                        <PencilAltIcon
                          className="h-6 hover:text-[#16a085] text-black absolute right-4 cursor-pointer"
                          fill="none"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col justify-between p-4 bg-yellow-50 border border-yellow-400 rounded-b-md">
                      <div className="flex items-center">
                        <div className="w-1/4 font-bold">Fag:</div>
                        <div>{group.subject}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/4 font-bold">Type:</div>
                        <div>{group.type}</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 relative">
                    <div className="w-full bg-yellow-400 h-8 rounded-t-md flex justify-center items-center text-lg">
                      <div className="">Om oss</div>
                      {isAdmin ? (
                        <PencilAltIcon
                          className="h-6 hover:text-[#16a085] text-black absolute right-4 cursor-pointer"
                          fill="none"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col justify-between p-4 bg-yellow-50 border border-yellow-400 rounded-b-md">
                      <div>{group.description}</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col space-y-2">
                  <div className="">
                    <div className="w-full bg-yellow-400 h-8 rounded-t-md flex justify-center items-center text-lg">
                      Medlemmer
                    </div>

                    <ul className="flex flex-col justify-between p-4 bg-yellow-50 border border-yellow-400 rounded-b-md">
                      {membersArray.map((member, index) => {
                        return (
                          <li
                            key={index}
                            className="flex items-center space-x-2 justify-between"
                          >
                            <div>{member.name}</div>
                            {isAdmin ? (
                              <UserRemoveIcon
                                className="h-6 hover:text-red-500 text-black cursor-pointer"
                                fill="none"
                              />
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {group.role === "Administrator" ? (
                    <div>
                      <div className="w-full bg-yellow-400 h-8 rounded-t-md flex justify-center items-center text-lg">
                        Administrer
                      </div>
                      <div className="flex flex-col justify-between p-4 bg-yellow-50 border border-yellow-400 rounded-b-md w-full">
                        {search ? (
                          <div className="flex flex-col justify-center items-center space-y-2">
                            <div className="flex items-center space-x-2 w-full">
                              <Link href={"/matching"}>
                                <button className="rounded-md bg-yellow-400 px-2 py-1 w-1/2 mx-auto">
                                  Søk
                                </button>
                              </Link>
                              {groupSurveys && groupSurveys.length > 0 ? (
                                <Link
                                  href={`/results?resultId=${groupSurveys[0].surveyId}`}
                                >
                                  <button className="rounded-md bg-yellow-400 px-2 py-1 w-1/2 mx-auto">
                                    Resultater
                                  </button>
                                </Link>
                              ) : null}
                            </div>
                            <button
                              className="rounded-md bg-yellow-400 px-2 py-1 mx-auto"
                              onClick={() => {
                                handleOpenRequest();
                              }}
                            >
                              Innkommende Forespørseler
                            </button>
                          </div>
                        ) : (
                          <Link href={"/matching"}>
                            <button className="rounded-md bg-yellow-400 px-2 py-1 w-1/2 mx-auto">
                              Søk etter nye medlemmer
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="col-span-3 flex justify-end items-center px-4 mt-4">
                  {isAdmin ? (
                    <button
                      className="px-2 py-4 bg-red-400 cursor-pointer hover:scale-95 rounded-md"
                      onClick={() => {
                        handleDeleteColloquium(group.id);
                      }}
                    >
                      Slett gruppe
                    </button>
                  ) : (
                    <button
                      className="px-2 py-4 bg-yellow-400 cursor-pointer hover:scale-95 rounded-md"
                      onClick={() => {
                        handleLeave(group.id);
                      }}
                    >
                      Forlat gruppe
                    </button>
                  )}
                </div>
              </div>
              <RequestModal
                openRequest={openRequest}
                setOpenRequest={setOpenRequest}
                requests={requests}
                token={token}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RequestModal = ({ openRequest, setOpenRequest, requests, token }) => {
  if (!requests) {
    return null;
  }

  return (
    <div
      className={`absolute flex justify-center items-center top-0 left-0 w-screen h-screen] ${
        !openRequest ? "hidden" : null
      }`}
    >
      <div className="h-[48rem] w-[64rem] rounded-lg bg-white flex flex-col items-center justify-start p-8 z-20 mt-16">
        {/* Title */}
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-bold">Forespørseler</div>
          <div className="h-0.5 w-[130%] bg-black"></div>
        </div>
        {/* Request list */}

        <div className="w-full flex flex-col justify-center items-center mt-8 space-y-4">
          {requests.length > 0 ? (
            <div>
              {requests.map((request, index) => {
                const [isOpen, setIsOpen] = useState(false);
                const [isAccepted, setIsAccepted] = useState(false);
                const [isDeclined, setIsDeclined] = useState(false);

                const handleOpen = () => {
                  setIsOpen(!isOpen);
                };

                const handleAccept = () => {
                  setIsAccepted(true);

                  const res = fetch(
                    "https://copia.dev/api/colloquium/acceptJoinRequest",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        joinRequestId: request.joinRequestId,
                      }),
                    }
                  );
                  res
                    .then((res) => {
                      console.log(res);
                      if (res.status === 200) {
                        alert("Du har akseptert forespørselen");
                        window?.location.reload;
                      }
                    })
                    .catch((err) => {
                      alert("Noe gikk galt!");
                    });
                };

                const handleDecline = () => {
                  setIsDeclined(true);

                  const res = fetch(
                    "https://copia.dev/api/colloquium/deleteJoinRequest",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        joinRequestId: request.id,
                      }),
                    }
                  );
                  res
                    .then((res) => {
                      console.log(res);
                      if (res.status === 200) {
                        alert("Du har avvist forespørselen");
                        console.log(res);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };
                return (
                  <div
                    className={`bg-yellow-200 w-full rounded-md overflow-hidden mt-2 ${
                      isAccepted || isDeclined ? "hidden" : null
                    }`}
                    onClick={handleOpen}
                    key={index}
                  >
                    {/* Header */}
                    <div className="bg-yellow-400 w-full py-2 text-lg px-4 flex justify-between items-center cursor-pointer">
                      <p>Medlem-forespørsel fra {request.name}</p>
                      <div className="flex space-x-4">
                        <div
                          className="bg-green-400 px-2 py-1 rounded-md w-28 text-center hover:scale-95"
                          onClick={handleAccept}
                        >
                          Aksepter
                        </div>
                        <div
                          className="bg-red-400 px-2 py-1 rounded-md w-28 text-center hover:scale-95"
                          onClick={handleDecline}
                        >
                          Avslå
                        </div>
                      </div>
                    </div>
                    {/* Body */}
                    <div
                      className={`p-4 flex justify-between items-center w-full space-y-2 ${
                        isOpen ? "block" : "hidden"
                      }`}
                    >
                      <div className="border border-yellow-400 rounded-md overflow-hidden w-[45%]">
                        <div className="bg-yellow-400 text-center rounded-t-md">
                          Om {request.name}
                        </div>
                        <div className="bg-yellow-50 p-2">{request.about}</div>
                      </div>
                      <div className="border border-yellow-400 rounded-md overflow-hidden w-[45%]">
                        <div className="bg-yellow-400 text-center rounded-t-md">
                          Personlig melding
                        </div>
                        <div className="bg-yellow-50 p-2">
                          {request.message}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Ingen forespørseler</div>
          )}
        </div>
      </div>

      <div
        className="bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 w-screen h-screen z-10"
        onClick={() => {
          setOpenRequest(false);
        }}
      ></div>
    </div>
  );
};

export default GroupList;
