import React, { useEffect, useState } from "react";
import RightBar from "../components/global/RightBar";
import Navbar from "../components/global/Navbar";
import GroupList from "../components/groups/GroupList";
import { useRecoilValue } from "recoil";
import { groupsState, tokenState, userState } from "../stores/atoms";
import Link from "next/link";
import InfoModal from "../components/global/Modal/InfoModal";
import { InformationCircleIcon, UserIcon } from "@heroicons/react/solid";

const groups = () => {
  const groups = useRecoilValue(groupsState);
  const [isOpen, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("existing");

  return (
    <div>
      <Navbar currentUrl={"/groups"} />
      <RightBar />
      <div className="flex justify-center items-center max-w-7 m-auto flex-col space-y-8">
        {/* Page title */}
        <div className="w-1/2 flex justify-center items-center flex-col space-y-2 mt-8">
          <h1 className="text-3xl font-bold">
            Administrer dine kollokvie grupper
          </h1>
          <div className="w-full h-0.5 bg-black"></div>
        </div>
        {/* Page menu */}
        <Menu
          activePage={activePage}
          setActivePage={setActivePage}
          setOpen={setOpen}
          isOpen={isOpen}
        />

        {/* Page content */}
        <Content activePage={activePage} groups={groups} />
      </div>
    </div>
  );
};

const Menu = ({ activePage, setActivePage, isOpen, setOpen }) => {
  return (
    <div className="w-8/12 border-b-2 border-yellow-400">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`px-2 py-1 border-l-2 border-yellow-400 cursor-pointer ${
              activePage === "existing" ? "bg-yellow-400" : "bg-yellow-200"
            }`}
            onClick={() => setActivePage("existing")}
          >
            Eksisterende grupper
          </div>
          <div
            className={`px-2 py-1 border-l-2 border-yellow-400 cursor-pointer ${
              activePage === "search" ? "bg-yellow-400" : "bg-yellow-200"
            }`}
            onClick={() => setActivePage("search")}
          >
            Pågående søk
          </div>
          <div
            className={`px-2 py-1 border-l-2 border-yellow-400 cursor-pointer ${
              activePage === "requests" ? "bg-yellow-400" : "bg-yellow-200"
            }`}
            onClick={() => setActivePage("requests")}
          >
            Forespørseler
          </div>
          <button onClick={() => setOpen(true)}>
            {" "}
            <InformationCircleIcon className="h-8 w-8   text-[#6664AC] hover:text-[#514eaa]" />
          </button>
          <InfoModal setOpen={setOpen} isOpen={isOpen} info={"groups"} />
        </div>
        <Link href={"/matching"}>
          <div className="px-2 py-1 bg-yellow-400 cursor-pointer">
            Gå til matching
          </div>
        </Link>
      </div>
    </div>
  );
};

const Content = ({ activePage, groups }) => {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);
  const [activeSearches, setActiveSearches] = useState([]);

  //fetch active searches from backend
  const fetchActiveSearches = async () => {
    if (user.id) {
      const res = await fetch(
        `https://copia.dev/api/survey/getallcompletedsurveys?surveyeeId=${user.id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      data.forEach(async (search) => {
        const res = await fetch(
          `https://copia.dev/api/survey/getsurveybyid?surveyId=${search.surveyId}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const detailsData = await res.json();

        setActiveSearches((prev) => [...prev, detailsData]);
      });
    }
  };

  useEffect(() => {
    fetchActiveSearches();
  }, [user]);

  const ExistingContent = () => {
    if (groups.length > 0) {
      return (
        <div className="w-full px-32">
          <GroupList data={groups} />
        </div>
      );
    } else {
      return <div>Ingen grupper</div>;
    }
  };

  const SearchContent = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [deletedSearches, setDeletedSearches] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const handleClick = (index) => {
      if (activeCard === index) {
        setActiveCard(null);
      } else {
        setActiveCard(index);
      }
    };

    useEffect(() => {
      fetchSentRequests();
    }, []);

    const fetchSentRequests = async () => {
      const response = await fetch(
        `https://copia.dev/api/user/getalljoinrequests`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSentRequests(data);
      } else {
        console.log("Error fetching sent requests");
      }
    };

    const handleDelete = async (surveyId) => {
      const res = await fetch(
        `https://copia.dev/api/survey/delete?surveyId=${surveyId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const status = await res.status;
      if (status === 204) {
        setDeletedSearches((prev) => [...prev, surveyId]);
        window?.location.reload();
        return true;
      } else {
        console.log("Error deleting survey");
        return false;
      }
    };

    const handleDeleteRequest = async (requestId) => {
      const res = await fetch(
        `https://copia.dev/api/colloquium/deletejoinrequest?joinrequestId=${requestId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const status = await res.status;

      if (status === 204) {
        window?.location.reload();
      } else {
        console.log("Error deleting request");
      }
    };
    return (
      <div>
        {/* Title */}
        <div className="flex justify-center items-center flex-col mb-2">
          <h1 className="text-2xl">Aktive søk</h1>
          <div className="h-0.5 bg-black w-[130%]"></div>
        </div>
        {activeSearches.length > 0 ? (
          <div className="w-full max-w-7xl flex flex-col justify-center items-center">
            {/* Content */}
            {activeSearches?.map((search, index) => (
              <div key={search.surveyId}>
                <SearchCard
                  data={search}
                  activeCard={activeCard}
                  index={index}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                  deletedSearches={deletedSearches}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Ingen pågående søk</div>
        )}
        <div className="mt-8 flex justify-center items-center flex-col">
          {/* Title */}
          <div className="flex justify-center items-center flex-col mb-2">
            <h1 className="text-2xl">Sendte forspørseler til grupper</h1>
            <div className="bg-black h-0.5 w-[130%]"></div>
          </div>
          {sentRequests.length > 0 ? (
            <div className="w-full">
              {sentRequests.map((request, index) => (
                <div
                  key={index}
                  className="w-full max-w-7xl bg-yellow-200 rounded-md overflow-hidden"
                >
                  {/* Header */}
                  <div className="w-full bg-yellow-400 h-16 flex justify-start items-center px-8">
                    Venter på svar fra "{request.name}"
                  </div>
                  {/* Content */}
                  <div className="grid grid-cols-3 p-4 gap-4 grid-flow-row">
                    {/* Description */}
                    <div className="rounded-md bg-yellow-50 overflow-hidden col-span-2">
                      {/* Header */}
                      <div className="bg-yellow-400 px-4 py-2 text-center">
                        Beskrivelse
                      </div>
                      {/* Content */}
                      <div className="p-4">{request.description}</div>
                    </div>
                    {/* Members */}
                    <div className="bg-yellow-50 rounded-md overflow-hidden col-span-1">
                      {/* Header */}
                      <div className="bg-yellow-400 px-4 py-2 text-center">
                        Medlemmer
                      </div>
                      {/* Content */}
                      <div className=" p-4 overflow-hidden">
                        {request.members.map((member, index) => (
                          <div key={index}>{member}</div>
                        ))}
                      </div>
                    </div>
                    {/* Message */}
                    <div className="rounded-md bg-yellow-50 overflow-hidden col-span-2">
                      {/* Header */}
                      <div className="bg-yellow-400 px-4 py-2 text-center">
                        Din melding
                      </div>
                      {/* Content */}
                      <div className="p-4">{request.message}</div>
                    </div>
                    {/* Buttons */}
                    <div className="col-span-3 flex justify-around items-center">
                      <button
                        className="px-4 py-2 bg-yellow-400 rounded-md hover:scale-95"
                        onClick={() => {
                          handleDeleteRequest(request.joinRequestId);
                        }}
                      >
                        Avbryt forespørsel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Ingen sendte forespørseler</div>
          )}
        </div>
      </div>
    );
  };

  const RequestsContent = () => {
    const [invites, setInvites] = useState([]);
    const token = useRecoilValue(tokenState);

    const fetchInvites = async () => {
      const res = await fetch(`https://copia.dev/api/user/getallinvites`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setInvites(data);
    };

    useEffect(() => {
      fetchInvites();
    }, []);

    if (invites.length === 0) {
      return <div>Du har ikke mottatt noen invitasjoner</div>;
    } else {
      return (
        <div className="w-full max-w-7xl">
          {invites.map((invite, index) => {
            const handleAccept = async () => {
              const res = await fetch(
                `https://copia.dev/api/colloquium/acceptinvite`,
                {
                  method: "POST",
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    inviteId: invite.inviteId,
                  }),
                }
              );

              const status = await res.status;

              if (status === 200) {
                removeInvite(invite.inviteId);
                window?.location.reload();
              } else {
                window?.location.reload();
                console.log("Error accepting invite");
              }
            };
            const handleDecline = async () => {
              const res = await fetch(
                `https://copia.dev/api/colloquium/deleteinvite`,
                {
                  method: "POST",
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    inviteId: invite.inviteId,
                  }),
                }
              );

              const status = await res.status;

              if (status === 200) {
                removeInvite(invite.inviteId);
              } else {
                console.log("Error declining invite");
              }
            };

            const removeInvite = (id) => {
              setInvites((prev) =>
                prev.filter((invite) => invite.inviteId !== id)
              );
            };
            return (
              <div
                key={index}
                className="bg-yellow-200 w-full rounded-md overflow-hidden"
              >
                {/* Header */}
                <div className="bg-yellow-400 h-24 w-full flex justify-between items-center px-8">
                  <p className="text-lg">Invitasjon fra {invite.name}</p>
                  <div className="flex flex-col justify-center items-center">
                    <p>
                      {invite.members.length} / {invite.memberLimit}
                    </p>
                    <UserIcon className="h-6 w-6" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-4 flex justify-center items-center ">
                  <div className="bg-yellow-50 rounded-md overflow-hidden w-[50%]">
                    {/* Header */}
                    <div className="w-full px-2 bg-yellow-400 text-center">
                      Melding
                    </div>
                    {/* Content */}
                    <div className="px-4 py-2">{invite.message}</div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex justify-around items-center mb-4">
                  <button
                    className="bg-green-400 cursor-pointer rounded-md py-2 px-4 hover:scale-95"
                    onClick={handleAccept}
                  >
                    Aksepter
                  </button>
                  <button
                    className="bg-red-400 cursor-pointer rounded-md py-2 px-4 hover:scale-95"
                    onClick={handleDecline}
                  >
                    Avslå
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  switch (activePage) {
    case "existing":
      return <ExistingContent />;
    case "search":
      return <SearchContent />;
    case "requests":
      return <RequestsContent />;
    default:
      return <div>Error</div>;
  }
};

const SearchCard = ({ data, activeCard, index, handleClick, handleDelete }) => {
  const [deleted, setDeleted] = useState(false);

  return (
    <div
      className={`rounded-lg w-full bg-yellow-200 overflow-hidden ${
        activeCard != index ? "h-16" : null
      } ${deleted ? "hidden" : null}`}
    >
      {/* Header */}
      <div
        className="flex justify-start items-center bg-yellow-400 py-4 text-xl px-8 h-16"
        onClick={() => handleClick(index)}
      >
        Søk etter gruppe til:{" "}
        {data.subjects.find((s) => s.id === data.subjectId).name}
      </div>
      {/* Content */}
      <div className="px-8 py-4 flex flex-col justify-center items-center space-y-4 bg-yellow-100">
        {/* Top, search criteria */}
        <div className="border-2 border-yellow-400 rounded-md w-full bg-yellow-50">
          {/* Section header */}
          <div className="py-1 px-4 text-center font-bold bg-yellow-400">
            Søkekriterier
          </div>
          {/* Section content */}
          <div className="grid grid-cols-2 grid-flow-row py-4 gap-y-4">
            {data.questions.map((q) => {
              return (
                <div
                  className="flex flex-col justify-center items-center space-y-1"
                  key={q.questionId}
                >
                  <div className="font-bold">{q.description}</div>
                  <div>{q.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Bottom, buttons */}
        <div className="flex items-center justify-around w-full">
          <Link href={`/results?surveyId=${data.surveyId}`}>
            <button className="rounded-md bg-yellow-400 cursor-pointer px-2 py-1 text-lg">
              Se resultater
            </button>
          </Link>
          <button
            className="rounded-md bg-yellow-400 cursor-pointer px-2 py-1 text-lg"
            onClick={() => {
              const res = handleDelete(data.surveyId);
              if (res) {
                setDeleted(true);
              } else {
                console.log("Error deleting survey");
              }
            }}
          >
            Avslutt søk
          </button>
        </div>
      </div>
    </div>
  );
};

export default groups;
