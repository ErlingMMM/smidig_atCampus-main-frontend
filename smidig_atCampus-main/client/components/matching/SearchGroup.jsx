import React, { useState } from "react";
import SearchIcon from "../../public/svg/undraw_search_icon.svg";
import InfoModal from "../global/Modal/InfoModal";

function SearchGroup() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className=" grid grid-cols-1 place-items-center justify-between leading-tight md:p-4 mt-1 bg-[#FFEFCE] rounded shadow border w-96 h-36">
        <div className="text-xl translate-y-[0.65rem]">
          Kjenner du noen fra før?
        </div>
        <div>
          <input
            type="text"
            className="bg-[#6664AC] h-12 rounded  translate-y-[-0.3rem] text-white text-xl max-h-12 pl-2 max-w-[20rem] translate-x-7 placeholderHoverMatching focus:outline-none  focus:ring-transparent"
            placeholder="Søk etter en gruppe:"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Søk etter en gruppe:")}
          ></input>
          <button onClick={() => setOpen(true)}>
            <div>
              <SearchIcon className="translate-y-5 scale-[60%] bg-[#6664AC] translate-x-[-1.4rem] hover:scale-50 " />
            </div>
          </button>

          <InfoModal setOpen={setOpen} isOpen={isOpen} info={"searchGroup"} />
        </div>
      </div>
    </div>
  );
}

export default SearchGroup;
