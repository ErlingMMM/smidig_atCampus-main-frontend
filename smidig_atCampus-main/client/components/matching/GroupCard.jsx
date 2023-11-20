import React, { useEffect } from "react";

function GroupCard({ data, userAnswer, setUserAnswer }) {
  useEffect(() => {
    setUserAnswer({ option: "", value: "" });
  }, []);

  if (userAnswer) {
    return (
      <div className={`flex items-center flex-wrap min-h-[11.4rem] mt-8`}>
        <div className={` max-w-7xl `}>
          {data.map((groups) => {
            return (
              <div
                className={`grid ${
                  groups.length <= 2
                    ? `grid-cols-${groups.length}`
                    : "grid-cols-3"
                } gap-4`}
              >
                {groups.map((group) => {
                  return (
                    <button
                      className={`hover:scale-95`}
                      key={group.id}
                      value={group.name}
                      onClick={() => {
                        setUserAnswer({ option: group.name, value: group.id });
                      }}
                    >
                      <a class="relative inline-block text-lg group p-5  w-96 h-7 ">
                        <span class="relative z-10 block  h-14  overflow-hidden leading-tight ease-in text-white rounded-lg">
                          <span class="absolute inset-0 rounded-lg bg-[#6664AC]"></span>
                          <span
                            class={`absolute -left-10 w-[47rem] h-[47rem] -ml-64 transition-all duration-700 origin-top-right rounded-r-full -translate-x-full translate-y-24 bg-[#16a085] ease ${
                              userAnswer.option === group.name
                                ? "-rotate-180"
                                : "-rotate-90"
                            }`}
                          ></span>
                          <span class="relative text-sm top-4">
                            {group.name}
                          </span>
                        </span>
                      </a>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default GroupCard;
