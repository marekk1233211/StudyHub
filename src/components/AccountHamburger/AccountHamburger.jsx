import styles from "./AccountHamburger.module.scss";
import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../AuthContext/AuthContext";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../config";
import { Redirect } from "react-router-dom";
const AccountHamburger = ({ theme }) => {
  const { logoutFun } = useContext(AuthContext);
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const menuListClasses = `${styles.menuList} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const handleGoToProfile = (e) => {
    e.preventDefault();
    const status = localStorage.getItem("STATUS");
    // redirect user to the auth page based on the returned status
    if (status === "student") {
      return <Redirect to="/studentIn" />;
    }
    if (status === "tutor") {
      return <Redirect to="/tutorIn" />;
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleChangePasswordAccount = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (newPassword !== confirmNewPassword) {
      alert("new password and confirmed password didn't match !");
      return;
    }

    try {
      // send PUT request to change password
      const response = await axios.put(`${baseURL}/change-password/${userId}`, {
        newPassword: newPassword,
      });

      console.log("Password changed successfully", response.data);
      // close modal if password is successfully changed.
      alert("password changed.");
      setIsModalOpen(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Błąd podczas zmiany hasła:", error);
    }
  };
  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.delete(`${baseURL}/delete-account/${userId}`);
      logoutFun();
    } catch (error) {
      console.error("Błąd podczas usuwania konta:", error);
    }
  };
  const outerWrapperClasses = `${styles.outerWrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return (
    <div className={styles.accountHamburger}>
      <div className={styles.faGearIcon}>
        <FontAwesomeIcon
          icon={faGear}
          style={
            theme === "dark"
              ? { color: "#ffefd7", fontSize: "24px" }
              : { color: "#ffefd7", fontSize: "24px" }
          }
          onClick={() => setToggleHamburger((cur) => !cur)}
        />
      </div>
      {toggleHamburger ? (
        <ul className={menuListClasses}>
          <li onClick={handleGoToProfile}>
            {/* <a>profil</a> */}
            <Button theme={theme}>profil</Button>
          </li>
          {/* <li>
            <a>support</a>
          </li> */}
          <li onClick={handleOpenModal}>
            {/* <a>change password</a>
             */}
            <Button theme={theme}>Change password</Button>
          </li>
          <li onClick={handleDeleteAccount}>
            {/* <a>delete account</a>
             */}
            <Button theme={theme}>Delete account</Button>
          </li>
          <li>
            <Button theme={theme} handleOnClick={() => logoutFun()}>
              Log out
            </Button>
          </li>
        </ul>
      ) : (
        <div></div>
      )}
      {isModalOpen && (
        <div className={outerWrapperClasses}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <form onSubmit={handleChangePasswordAccount}>
                <p>enter new password: </p>

                <input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
                <p>confirm new password: </p>
                <input
                  type="password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  value={confirmNewPassword}
                />
                <p></p>
                <Button theme={theme} onClick={handleChangePasswordAccount}>
                  Save
                </Button>
              </form>
            </div>
            <div className={styles.close} onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountHamburger;
