import { useEffect, useState } from "react";
import BaseAPI from "../Api/BaseAPI";
import { Page } from "../App";
import AuthContext from "../context/AuthContext";

type UserType = {
  username: String;
  accessToken: String;
  id: String;
  refreshToken: String;
};

type AuthProviederPropsType = {
  children: React.ReactNode;
  setCurrentPage: (page: Page) => void;
  setErrorMsg: (error: Page) => void;
  errorMsg: String;
};

function AuthProvider({ children, setCurrentPage, setErrorMsg, errorMsg }: AuthProviederPropsType) {
  const [user, setUser] = useState<UserType>({
    username: "",
    accessToken: "",
    id: "",
    refreshToken: "",
  });

  useEffect(() => {
    chrome.storage.sync.get("userData", async (data) => {
      console.log("data.userData: ", data);
      setUser(data.userData);
      if (!!data.userData.id) {
        setCurrentPage("History");
      }
    });
  }, []);

  const handleSignIn = async (email: String, password: String, setIsLoader: any) => {
    try {
      setIsLoader(true);
      let data = JSON.stringify({
        username: email,
        password,
      });

      let response = await BaseAPI.post("auth/signin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        chrome.storage.sync.set({ userData: response.data.data });
        setUser({ username: email, ...response?.data?.data });
        setCurrentPage("History");
        setIsLoader(false);
      } else {
        setErrorMsg(response.error.message);
        setIsLoader(false);
      }
    } catch (error) {
      setIsLoader(false);
    }
  };

  const handleSignUp = async (email: String, password: String, name: String, setIsLoader: any) => {
    try {
      setIsLoader(true);
      let data = JSON.stringify({
        username: email,
        password,
        name,
      });

      let response = await BaseAPI.post("auth/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setUser({ username: email, name, ...response?.data?.data });
        setCurrentPage("Signin");
        setIsLoader(false);
      } else {
        setErrorMsg(response.error.message);
        setIsLoader(false);
      }
    } catch (error) {
      setIsLoader(false);
    }
  };

  return <AuthContext.Provider value={{ user, handleSignIn, handleSignUp, errorMsg, setErrorMsg }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
