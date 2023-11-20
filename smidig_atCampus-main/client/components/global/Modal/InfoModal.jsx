import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const InfoModal = ({ isOpen, setOpen, info }) => {
  const [printInfo, setPrintInfo] = useState("existingGroups");

  const printMessage = (value) => {
    switch (value) {
      case "existingGroups":
        return existingGroup();
      case "activeSearch":
        return activeSearch();
      case "requests":
        return requests();
      default:
        break;
    }
  };

  const existingGroup = () => {
    return (
      <div>
        {" "}
        Her vises alle gruppene dine. Den som har opprettet gruppen, kan se
        forespørseler fra andre studenter og resultater fra kollekviematcher.
      </div>
    );
  };

  const activeSearch = () => {
    return (
      <div>
        Her vises alle matchprofilene dine og sendte søknader du har opprettet
        som <u>enkeltperson</u>. Altså ikke i felleskap med en gruppe du er
        medlem av.
      </div>
    );
  };

  const requests = () => {
    return (
      <div>
        Her vises alle invitasjoner fra enkeltpersoner eller grupper som ønsker
        å ha deg med i en gruppe. <br />
        Dette er fra dine matching søk som <u>enkeltperson</u>.{" "}
      </div>
    );
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <div
              className="absolute w-screen h-screen bg-[rgba(0,0,0,0.7)] z-10"
              onClick={() => setOpen(false)}
            ></div>
            <div className="flex flex-col justify-center items-center bg-white rounded-xl p-4 space-y-2 z-30">
              <div className="w-full h-10 flex justify-end">
                <button
                  className={`rounded-full w-8 h-8 border border-transparent shadow-sm  hover:bg-gray-300  hover:text-white text-base font-medium   focus:outline-none  focus:ring-transparent`}
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
              </div>
              <div className="w-96 py-2 rounded-md border -translate-y-5 border-transparent shadow-sm  text-center">
                <div className=" grid  grid-cols-3 gap-5 w-full ">
                  {info === "groups" ? (
                    <>
                      <button
                        className={` ${
                          printInfo === "existingGroups"
                            ? "bg-yellow-400"
                            : "bg-yellow-200"
                        } rounded  py-3 px-3`}
                        onClick={() => setPrintInfo("existingGroups")}
                      >
                        Eksisterende grupper
                      </button>
                      <button
                        className={` ${
                          printInfo === "activeSearch"
                            ? "bg-yellow-400"
                            : "bg-yellow-200"
                        } rounded  py-3 px-3`}
                        onClick={() => setPrintInfo("activeSearch")}
                      >
                        Pågående søk
                      </button>
                      <button
                        className={` ${
                          printInfo === "requests"
                            ? "bg-yellow-400"
                            : "bg-yellow-200"
                        } rounded  py-3 pr-3 pl-2`}
                        onClick={() => setPrintInfo("requests")}
                      >
                        Forespørseler
                      </button>
                    </>
                  ) : null}
                </div>
                {info === "groups" ? (
                  <div className="pt-10">{printMessage(printInfo)}</div>
                ) : null}
                {info === "calendar" ? (
                  <div>
                    I kalenderen din vises informasjon om hendelser i din
                    visnings-aktive gruppe. Om du er medlem i flere grupper enn
                    en, kan du endre visnings-aktiv gruppe øverst i sidemenyen
                    til venstre.{" "}
                  </div>
                ) : null}
                {info === "results" ? (
                  <div>
                    Når man sender en forespørsel til andre studenter man har
                    matchet med, vil resultatet fjernes fra resultater
                  </div>
                ) : null}
                {info === "matchingIndex" ? (
                  <div>
                    Kun personer som selv har opprettet en gruppe, kan
                    gjennomføre kollekviematcher på vegne av gruppen
                  </div>
                ) : null}
                {info === "searchGroup" ? (
                  <div>
                    Det vil ganske snart bli mulig å søke opp grupper. Vi i
                    atCampus håper dere har en fin dag og ønsker dere til lykke
                    med studiene!
                  </div>
                ) : null}
                {info === "editText" ? (
                  <div>
                    Vil du ikke endre noe likevel? Bare legge til et mellomrom
                    bak det siste du skrev.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default InfoModal;
