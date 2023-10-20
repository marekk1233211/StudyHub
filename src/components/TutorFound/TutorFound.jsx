import React, { useState, useEffect } from "react";
import styles from "./TutorFound.module.scss";
import { Link, useLocation, useHistory } from "react-router-dom";
import Button from "../Button/Button";
import { baseURL } from "../config";

const TutorFound = ({ theme }) => {
  const location = useLocation();
  const { filteredTutorData, allTutorData } = location.state ?? {}; // data uploaded
  const [selectedTutor, setSelectedTutor] = useState(null);
  const history = useHistory();

  const innerWrapperClasses = `${styles.innerWrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const tutorFoundParagraphClasses = `${styles.tutorFoundParagraph} ${
    theme === "dark" ? styles.dark : styles.light
  }`;

  // const baseUrl = baseURL; // add base url to your server

  const btnToRedirectHandler = (idValue) => {
    const tutor = allTutorData.find((tutor) => tutor._id === idValue);
    setSelectedTutor(tutor);
    console.log(selectedTutor);
    history.push({
      pathname: `/tutor/${idValue}`,
      state: { selectedTutorData: tutor },
    });
  };
  const chooseMeHandle = (e) => {
    console.log(e.target);
    console.log(e.target.id);
    return btnToRedirectHandler(e.target.id);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.element}>
        {filteredTutorData.map((item) => (
          <div className={innerWrapperClasses}>
            <div className={styles.nameAndImg}>
              <h2 className={styles.name}>
                {item.name} {item.lastName}
              </h2>
              <div className={styles.img}>
                <img
                  src={`${baseURL}/api/images/${item.image}`}
                  alt="Profile Image"
                />
              </div>
            </div>
            <div className={styles.dataInfo}>
              <p>subject: {item.subject}</p>
              <p>education level: {item.levelOfEducation}</p>
              <p>topic: {item.topic}</p>
              <p>localization: {item.localization}</p>
              <p>schedule: {item.schedule}</p>
              <p>price: {item.priceRange}</p>
              <p>tutoring provided: {item.numberOfTutoringProvided}</p>
              <p>average rating: {item.avgRating}</p>
            </div>
            <div className={styles.btn}>
              <Button
                theme={theme}
                handleOnClick={chooseMeHandle}
                id={item._id}
              >
                Choose me
              </Button>
            </div>
          </div>
        ))}
      </div>
      <p className={tutorFoundParagraphClasses}>
        tutors found: {filteredTutorData.length}/{allTutorData.length}
      </p>
      <Link to="/" className={styles.linkComp}>
        <Button theme={theme}>Back</Button>
      </Link>
    </div>
  );
};

export default TutorFound;
