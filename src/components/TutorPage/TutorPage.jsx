import styles from "./TutorPage.module.scss";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProfileSettingsForm from "../ProfileSettingsForm/ProfileSettingsForm";
import { AuthContext } from "../AuthContext/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../config";

import Button from "../Button/Button";

const TutorPage = ({ theme }) => {
  const { logoutFun } = useContext(AuthContext);
  const [nameProfile, setNameProfile] = useState("");
  const [lastNameProfile, setLastNameProfile] = useState("");
  const [subjectProfile, setSubjectProfile] = useState("");
  const [topicProfile, setTopicProfile] = useState("");
  const [levelOfEducationProfile, setLevelOfEducationProfile] = useState("");
  const [localizationProfile, setLocalizationProfile] = useState("");
  const [priceRangeProfile, setPriceRangeProfile] = useState("");
  const [image, setImage] = useState(null);

  // const baseUrl = "http://localhost:3000"; // Dodaj bazowy URL swojego serwera
  const fullImageUrl = `${baseURL}/api/images/${image}`;
  const [showProfileEditPopUp, setShowProfileEditPopUp] = useState(false);

  const wrapperClasses = `${styles.wrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:3000/tutor/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNameProfile(response.data.name);
        setLastNameProfile(response.data.lastName);
        setSubjectProfile(response.data.subject);
        setTopicProfile(response.data.topic);
        setLevelOfEducationProfile(response.data.levelOfEducation);
        setLocalizationProfile(response.data.localization);
        setPriceRangeProfile(response.data.priceRange);
        setImage(response.data.image);
      }, console.log(image))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleShowProfileEditPopUp = () => {
    setShowProfileEditPopUp(true);
  };
  return (
    <div className={wrapperClasses}>
      <div className={styles.profile}>
        <h2 className={styles.header}>My tutor profile</h2>
        <div className={styles.settingsIcon}>
          <FontAwesomeIcon
            icon={faPen}
            style={
              theme === "dark"
                ? { color: "#ffefd7", fontSize: "24px" }
                : { fontSize: "24px" }
            }
            onClick={handleShowProfileEditPopUp}
          />
        </div>
      </div>
      <h1 className={styles.dataName}>
        {nameProfile} {lastNameProfile}
      </h1>
      <div>{image && <img src={fullImageUrl} alt="Profile Image" />}</div>
      <div className={styles.profileData}>
        <p className={styles.data}>subject: {subjectProfile}</p>
        <p className={styles.data}>topic: {topicProfile}</p>
        <p className={styles.data}>
          level of education: {levelOfEducationProfile}
        </p>
        <p className={styles.data}>localization: {localizationProfile}</p>
        <p className={styles.data}>price range: {priceRangeProfile}</p>
      </div>
      <div className={styles.btn}>
        <Button theme={theme} handleOnClick={logoutFun}>
          Wyloguj
        </Button>
      </div>
      {showProfileEditPopUp && (
        <ProfileSettingsForm
          theme={theme}
          setShowProfileEditPopUp={setShowProfileEditPopUp}
        />
      )}
    </div>
  );
};

export default TutorPage;
