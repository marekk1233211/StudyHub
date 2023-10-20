import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import Button from "../Button/Button";
import { baseURL } from "../config";

const LoggedIn = ({ theme }) => {
  const [message, setMessage] = useState("");
  const { token, logoutFun } = useContext(AuthContext);
  useEffect(() => {
    // this is the function, which execute request to a server to check authentication.
    const checkAuthentication = async () => {
      try {
        // set configurations for the API call here
        const configuration = {
          method: "get",
          url: `${baseURL}/loggedIn`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // make the API call
        const response = await axios(configuration);
        // assign the message in our response to the message state
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuthentication();
  }, [token]);
  return (
    <div>
      {message}
      <Button theme={theme} handleOnClick={() => logoutFun()}>
        Log out
      </Button>
    </div>
  );
};

export default LoggedIn;
