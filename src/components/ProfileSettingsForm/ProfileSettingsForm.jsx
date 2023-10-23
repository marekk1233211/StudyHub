import styles from "./ProfileSettingsForm.module.scss";
import React, { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../config";

const ProfileSettingsForm = ({ theme, setShowProfileEditPopUp }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [levelOfEducation, setLevelOfEducation] = useState("");
  const [localization, setLocalization] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const wrapperClasses = `${styles.wrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const innerWrapperClasses = `${styles.innerWrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const outerWrapperClasses = `${styles.outerWrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const updateProfile = (e) => {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !subject ||
      !topic ||
      !levelOfEducation ||
      !localization ||
      !priceRange
    ) {
      alert(`All fields marked with an asterisk (*) are required.`);
      return;
    }
    const formData = new FormData();
    const token = localStorage.getItem("TOKEN");
    const userId = localStorage.getItem("userId");

    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("subject", subject);
    formData.append("topic", topic);
    formData.append("levelOfEducation", levelOfEducation);
    formData.append("localization", localization);
    formData.append("priceRange", priceRange);
    formData.append("image", image);

    axios
      .put(`${baseURL}/update-profile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Profil zaktualizowany:", response.data);
      })
      .catch((error) => {
        console.error("Błąd aktualizacji profilu:", error);
      });
    setShowProfileEditPopUp(false);
  };
  const closeProfileSettings = () => {
    setShowProfileEditPopUp(false);
  };
  return (
    <div className={outerWrapperClasses}>
      <div className={wrapperClasses}>
        <form className={styles.formWrapper} onSubmit={(e) => updateProfile(e)}>
          <div className={innerWrapperClasses}>
            <div>
              <p className={styles.personalData}>name*: </p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <p className={styles.personalData}>lastname*: </p>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div>
              <p className={styles.personalData}>subject*: </p>
              <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
            </div>
            <div>
              <p className={styles.personalData}>topic*: </p>
              <input
                type="text"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
              />
            </div>
            <div>
              <p className={styles.personalData}>level of education*: </p>
              <input
                type="text"
                onChange={(e) => setLevelOfEducation(e.target.value)}
                value={levelOfEducation}
              />
            </div>
            <div>
              <p className={styles.personalData}>localization*: </p>
              <input
                type="text"
                onChange={(e) => setLocalization(e.target.value)}
                value={localization}
              />
            </div>
            <div>
              <p className={styles.personalData}>price range*: </p>
              <input
                type="number"
                onChange={(e) => setPriceRange(e.target.value)}
                value={priceRange}
              />
            </div>
            <div>
              <p className={styles.personalData}>image:</p>
              <input
                className={styles.personalData}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Choose a file"
                title="No file chosen"
              />
            </div>
            <Button
              theme={theme}
              onClick={(e) => updateProfile(e)}
              id="saveProfileSettings"
            >
              Save the changes
            </Button>
          </div>
          <div className={styles.x} onClick={closeProfileSettings}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </form>
        {submitted ? (
          <p className="text-success">Submitted</p>
        ) : (
          <p className="text-danger">You have not saved the changes yet</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSettingsForm;
