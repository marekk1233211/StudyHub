import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({
  component: Component,
  theme,
  handleLogin,
  ...rest
}) {
  const { token, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    setIsLoggedIn(true);
  }, [token]);
  return (
    // this route takes other routes assigned to it from the App.js and return the same route if condition is met
    <Route
      {...rest}
      render={(props) => {
        // returns route if there is a valid token
        if (token) {
          return <Component {...props} theme={theme} />;
        } else {
          // returns the user to the landing page if there is no valid token set
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  // sets the location a user was about to access before being redirected to login
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
