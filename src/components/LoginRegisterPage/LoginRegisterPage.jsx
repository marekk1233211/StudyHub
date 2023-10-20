import styles from "./LoginRegisterPage.module.scss";
import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../AuthContext/AuthContext"; // Zaimportuj kontekst
import { Link, Redirect } from "react-router-dom";
import Button from "../Button/Button";
import axios from "axios";
import { baseURL } from "../config";

const LoginRegisterPage = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const wrapperClasses = `${styles.wrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const innerWrapper2Classes = `${styles.innerWrapper2} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const policyParagraphClasses = `${styles.policyParagraph} ${
    theme === "dark" ? styles.dark : styles.light
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: `${baseURL}/login`,
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        const token = result.data.token;
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1])); // token decoded
          // check if token has userId
          if (decodedToken && decodedToken.userId) {
            const userId = decodedToken.userId;
            localStorage.setItem("userId", userId);
          } else {
          }
        } else {
          console.log("Brak tokenu JWT w pamięci lokalnej.");
        }
        localStorage.setItem("TOKEN", token);
        console.log("token podczas logowania: ", token);
        setLogin(true);
        // redirect user to the auth page based on the returned status
        if (result.data.status === "student") {
          localStorage.setItem("STATUS", result.data.status);
          // window.location.href = "/studentIn";
          setIsLoggedIn(true);
        } else if (result.data.status === "tutor") {
          localStorage.setItem("STATUS", result.data.status);
          // window.location.href = "/tutorIn";
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };
  if (login) {
    return <Redirect to="/tutorIn" />;
  }

  return (
    <div className={wrapperClasses}>
      <form className={styles.formWrapper} onSubmit={(e) => handleSubmit(e)}>
        <div className={innerWrapper2Classes}>
          <input
            type="email"
            placeholder="e-mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button theme={theme} onClick={(e) => handleSubmit(e)}>
            Log in
          </Button>
          <Button theme={theme}>Forgot password ?</Button>
          <Link to="/registerPage" className={styles.linkComp}>
            <Button theme={theme}>Register</Button>
          </Link>
          {login ? (
            <p className="text-success">You Are Logged in Successfully</p>
          ) : (
            <p className="text-danger">You Are Not Logged in</p>
          )}
        </div>
      </form>
      <p className={policyParagraphClasses}>
        Logging in signifies acceptance of the current version of the{" "}
        <span>
          <Link to="/termsOfService" className={styles.linkComp}>
            Terms of Service
          </Link>
        </span>{" "}
        of StudyHub. If you do not accept the terms of the updated Terms of
        Service of StudyHub, please do not register.
      </p>
    </div>
  );
};

export default LoginRegisterPage;
