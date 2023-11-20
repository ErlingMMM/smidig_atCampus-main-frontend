import React, { useState, useEffect } from "react";

export const useLoader = (loadingFn) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const load = async () => {
    try {
      setLoading(true);
      setData(await loadingFn());
    } catch (e) {
      setError(e);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
};

export const fetchJSON = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    console.log("error", response);
    throw new Error(response.statusText);
  } else {
    return await response.json();
  }
};

export const getUserDetails = (userToken) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //Check if logged in?
      if (!window.localStorage.getItem("user-token")) {
        //Redirect to login page
        window.location.href = "/login";
      } else {
        //Get user details using user-token
        const response = async () =>
          await fetchJSON("https://copia.dev/api/user/getdetails", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
        response()
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, []);

  return { loading, error, user };
};

export const makeLogo = (groupName) => {
  if (groupName != null) {
    if (groupName.split(" ").length > 1) {
      const wordArray = groupName.split(" ");
      let result = "";
      wordArray.forEach((word) => {
        result += word.substring(0, 1).toUpperCase();
      });
      return result;
    } else {
      return groupName.substring(0, 3).toUpperCase();
    }
  }
};
