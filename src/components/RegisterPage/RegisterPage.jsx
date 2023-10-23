import styles from "./RegisterPage.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import { baseURL } from "../config";

const RegisterPage = ({ theme }) => {
  const [studentChecked, setStudentChecked] = useState(false);
  const [tutorChecked, setTutorChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [status, setStatus] = useState("");

  const wrapperClasses = `${styles.wrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const innerWrapper1Classes = `${styles.innerWrapper1} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const innerWrapper2Classes = `${styles.innerWrapper2} ${
    theme === "dark" ? styles.dark : styles.light
  }`;

  const handleStudentChange = () => {
    setStudentChecked(true);
    setTutorChecked(false);
  };

  const handleTutorChange = () => {
    setTutorChecked(true);
    setStudentChecked(false);
  };
  useEffect(() => {
    if (studentChecked) {
      setStatus("student");
    } else if (tutorChecked) {
      setStatus("tutor");
    } else {
      setStatus(null);
    }
  }, [studentChecked, tutorChecked]);
  const handleOnClick = (e) => {
    e.preventDefault();
    if (status === null) {
      alert("you have to choose status as student or tutor.");
      return;
    }
    // set configurations
    const configuration = {
      method: "post",
      url: `${baseURL}/register`,
      data: {
        email,
        password,
        status,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });

    alert("Submited");
  };
  return (
    <div className={wrapperClasses}>
      <form className={styles.formWrapper} onSubmit={(e) => handleOnClick(e)}>
        <div className={innerWrapper1Classes}>
          <p className={styles.logParagraph}>Register as:</p>
          <input
            type="checkbox"
            checked={studentChecked}
            onChange={handleStudentChange}
          />
          <span>student</span>
          <input
            type="checkbox"
            checked={tutorChecked}
            onChange={handleTutorChange}
          />
          <span>tutor</span>
        </div>
        <div className={innerWrapper2Classes}>
          <input
            type="email"
            placeholder="set e-mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="set password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button theme={theme} type="submit" id="registerBtn">
            Register
          </Button>
        </div>
      </form>
      {register ? (
        <p className="text-success">You Are Registered Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Registered</p>
      )}
    </div>
  );
};

export default RegisterPage;
