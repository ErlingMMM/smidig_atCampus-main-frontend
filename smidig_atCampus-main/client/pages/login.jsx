import Image from "next/image";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import loadingGif from "../public/gifs/loading.gif";
import { tokenState, userState } from "../stores/atoms";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    console.log(`Logging in with ${email} and ${password}`);
    setLoggingIn(true);
    const res = await fetch("https://copia.dev/api/user/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setLoggingIn(false);
    }
    if (data.token) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user-token", data.token);
        if (error === null) {
          setTimeout(() => {
            window.location.replace("/");
          }, 500);
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(email, password);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-screen"
      onKeyDown={(e) => {
        handleKeyPress(e);
      }}
    >
      <div className="w-72 h-96 bg-purple-300 rounded-lg flex flex-col items-center overflow-hidden -translate-y-16">
        {/* Header */}
        <div className="w-full h-16 bg-purple-500 flex justify-center items-center text-3xl font-bold text-white">
          atCampus
        </div>
        {/* Body */}
        <div className="h-80 w-full flex flex-col justify-start items-center space-y-8 px-4 relative mt-8">
          <InputField
            type={"email"}
            label={"E-post"}
            name={"email"}
            setValue={setEmail}
          />
          <InputField
            type={"password"}
            label={"Passord"}
            name={"password"}
            setValue={setPassword}
          />
          <div className={`${error ? "block" : "hidden"} text-red-600 `}>
            {error}
          </div>
          <div className="w-full flex flex-col justify-center items-center space-y-2 absolute bottom-4 px-4">
            <button
              className="w-full h-12 bg-purple-500 text-white rounded-lg font-bold"
              onClick={() => {
                handleLogin(email, password);
              }}
            >
              Logg inn
            </button>
            <p className="text-sm text-purple-50 underline cursor-pointer">
              Ny bruker? Register deg her
            </p>
          </div>
        </div>
        <div
          className={`w-full h-full flex justify-center items-center absolute top-0 left-0 rounded-lg bg-[rgba(0,0,0,.5)] ${
            !loggingIn ? "hidden" : null
          }`}
        >
          <Image src={loadingGif} width={64} height={64} className="relative" />
        </div>
      </div>
    </div>
  );
};

const InputField = ({ type, label, name, setValue }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full flex justify-start items-center">
      <label
        htmlFor={name}
        className={`transform absolute translate-x-1 text-purple-500 font-bold transition-all duration-150 ${
          active ? "-translate-y-9" : null
        }`}
      >
        {label}
      </label>
      <input
        onFocus={() => setActive(true)}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        name={name}
        id={name}
        className="w-full rounded-lg bg-purple-50 h-12 px-2"
      />
    </div>
  );
};

export default login;
