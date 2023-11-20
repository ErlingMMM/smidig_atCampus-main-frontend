import "tailwindcss/tailwind.css";
import "../global.css";
import { RecoilRoot } from "recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { groupsState, userState, tokenState } from "../stores/atoms";

function MyApp({ Component, pageProps }) {
  if (typeof window != "undefined") {
    if (
      !window.localStorage.getItem("user-token") &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }
  }
  return (
    <RecoilRoot>
      <DataLayer Component={Component} pageProps={pageProps} />
    </RecoilRoot>
  );
}

const DataLayer = ({ Component, pageProps }) => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const [groups, setGroups] = useRecoilState(groupsState);
  //If data is not loaded, fetch it
  useEffect(() => {
    if (!groups || !user || !token) {
      if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("user-token");
        if (token) {
          setToken(token);
          setUser(
            fetch("https://copia.dev/api/user/getdetails", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                setUser(res);
              })
          );
          setGroups(
            fetch("https://copia.dev/api/colloquium/getallcolloquiums", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                setGroups(res);
              })
          );
        }
      }
    }
  }, [token, user, groups]);
  return <Component {...pageProps} />;
};

export default MyApp;
