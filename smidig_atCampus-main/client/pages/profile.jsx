import React from "react";
import Sidebar from "../components/global/Navbar";
import RightBar from "../components/global/RightBar";
import { userState } from "../stores/atoms.js";
import { useRecoilValue } from "recoil";

const profile = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="lg:pl-16 pt-8 lg:pt-0">
      <Sidebar />
      <RightBar />
      <div className="">
        <div className="  w-full h-screen  bg-gray-300 pt-[1rem] pl-40 ">
          <div className=" bg-yellow-300 py-auto h-[44rem] w-[60rem] rounded-md  ">
            <div className="grid grid-cols-4 gap-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="pl-0 h-[15rem] w-[15rem]  "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className=""
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                />
              </svg>
              <label className=" pt-20 text-7xl w-[50rem]">
                Profilopplysninger
              </label>
              <div className=" bg-white w-[10.5rem] h-[2.9rem] ml-[18.5rem] mt-[11.5rem] rounded-md">
                <button className="hover:text-red-500 ml-[0.2rem] mt-[0.1rem] w-[5rem] h-10 bg-blue-300 rounded-md">
                  Avbryt
                </button>
                <button className="hover:text-red-500 ml-[0.2rem] mt-[0rem] w-[5rem] h-10 bg-blue-300 rounded-md">
                  Lagre
                </button>
              </div>
            </div>
            <div className="bg-white mx-4 h-[28rem] w-[28rem] rounded-md">
              <div className="grid grid-rows-5 gap-20 pl-10 pt-10 h-[20rem] ">
                <div className="gap-10">
                  <textarea
                    className=" resize-none ml-10 w-30 max-h-7 overflow-hidden text-blue-700 border-solid border-gray-300 border-2   "
                    placeholder="Mahdi"
                  >
                    {" "}
                  </textarea>
                  <label className="pl-5">Navn</label>
                </div>

                <div className="">
                  <textarea
                    className=" resize-none ml-10 w-30 max-h-7 overflow-hidden text-blue-700 border-solid border-gray-300 border-2   "
                    placeholder="Makhadzhiev"
                  >
                    {" "}
                  </textarea>
                  <label className="pl-5">Etternavn</label>
                </div>

                <div className="">
                  <textarea
                    className=" resize-none ml-10 w-30 max-h-7  overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                    placeholder=".........."
                  >
                    {" "}
                  </textarea>
                  <label className="pl-5">Passord</label>
                </div>

                <div className="">
                  <textarea
                    className=" resize-none ml-10 w-30 max-h-7  overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                    placeholder="+47 466 669 66"
                  >
                    {" "}
                  </textarea>
                  <label className="pl-5">Telefon</label>
                </div>

                <div className="">
                  <input
                    type="date"
                    data-date-inline-picker="true"
                    class=" ml-10 pl-[1rem] text-blue-700 border-solid border-gray-300 border-2"
                  />
                  <label className="pl-5">Fødsels-Dato</label>
                </div>
              </div>
              <div className="relative bottom-[20rem] right-[11rem] w-[29rem] h-[28rem] ml-[40rem] bg-white rounded-md">
                <div className="grid grid-rows-5 gap-10 pl-10 pt-10 h-[20rem] ">
                  <div className="">
                    <label className="pl-5">Epost</label>
                    <textarea
                      className=" resize-none ml-8 w-30 max-h-7 overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                      placeholder="Mahdi@hotmail.com"
                    >
                      {" "}
                    </textarea>
                  </div>
                  <div className="">
                    <label className="pl-5 ">Sted</label>
                    <textarea
                      className="resize-none ml-10 w-[5rem] h-7 overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                      placeholder="Mahdi@hotmail.com"
                    >
                      {" "}
                    </textarea>
                  </div>
                  <div className="">
                    <label className="pl-5 ">Post</label>
                    <textarea
                      className=" resize-none ml-10 w-[5rem] h-7 overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                      placeholder="Mahdi@hotmail.com"
                    >
                      {" "}
                    </textarea>
                  </div>
                  <div className="">
                    <label className="pl-5 ]">Addresse</label>
                    <textarea
                      className=" resize-none ml-3 w-[8rem] h-7 overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                      placeholder="Mahdi@hotmail.com"
                    >
                      {" "}
                    </textarea>
                  </div>
                  <div className="">
                    <label className="pl-5 flex justify-top">
                      Fortell om deg selv
                    </label>
                    <textarea
                      className=" resize-none ml-5 mt-0 w-80 h-20  overflow-hidden text-blue-700 border-solid border-gray-300 border-2  "
                      placeholder="Mahdi@hotmail.com"
                    >
                      {" "}
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default profile;
