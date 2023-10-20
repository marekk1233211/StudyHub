import styles from "./HomePage.module.scss";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faLayerGroup,
  faMoneyBill,
  faKey,
  faMagnifyingGlass,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../config";

const HomePage = ({ theme }) => {
  const history = useHistory();
  const [subject, setSubject] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [schedule, setSchedule] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [localization, setLocalization] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [tutorsData, setTutorsData] = useState([]);
  const [term, setTerm] = useState("");

  const selectClasses = `${styles.Select} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const aboutClasses = `${styles.about} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const optionWrapperClasses = `${styles.optionWrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const popupWrapperClasses = `${styles.popupWrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const generalFindFormClasses = `${styles.generalFindForm} ${
    theme === "dark" ? styles.dark : styles.light
  }`;

  const handleSearchClick = (e) => {
    e.preventDefault();
    // check if tutorsData.tutors is not undefined
    if (!tutorsData || !tutorsData.tutors) {
      console.error("Brak danych o tutorach.");
      return;
    }

    const filteredData = tutorsData.tutors.filter((item) => {
      const includesLocalization = (field) =>
        field && field.toLowerCase().includes(localization.toLowerCase());
      const includesSubject = (field) =>
        field && field.toLowerCase().includes(subject.toLowerCase());
      const includesLevelOfEducation = (field) =>
        field && field.toLowerCase().includes(educationLevel.toLowerCase());
      const includesTopic = (field) =>
        field && field.toLowerCase().includes(topic.toLowerCase());
      const includesSchedule = (field) =>
        field && field.toLowerCase().includes(schedule.toLowerCase());
      const isPriceInRange =
        !priceRange ||
        (item.priceRange && Number(item.priceRange) <= Number(priceRange));

      return (
        (!subject || includesSubject(item.subject)) &&
        (!educationLevel || includesLevelOfEducation(item.levelOfEducation)) &&
        (!topic || includesTopic(item.topic)) &&
        (!localization || includesLocalization(item.localization)) &&
        (!schedule || includesSchedule(item.schedule)) &&
        (!priceRange || Number(item.priceRange) <= Number(priceRange)) &&
        isPriceInRange
      );
    });
    const url = `/search?priceRange=${priceRange}&localization=${localization}&subject=${subject}&educationLevel=${educationLevel}&topic=${topic}&schedule=${schedule}`;
    history.push(url, {
      filteredTutorData: filteredData,
      allTutorData: tutorsData.tutors,
    });
  };

  const handleFindClick = (e) => {
    e.preventDefault();
    // check if tutorsData.tutors is not undefined
    if (!tutorsData || !tutorsData.tutors) {
      console.error("Brak danych o tutorach.");
      return;
    }
    // filter tutors if each of them has localization, subject, levelofeducation, topic, pricerange
    const filteredData = tutorsData.tutors.filter((item) => {
      const includesTerm = (field) => {
        if (!isNaN(Number(field))) {
          return item.priceRange && Number(item.priceRange) <= Number(term);
        } else {
          return field && field.toLowerCase().includes(term.toLowerCase());
        }
      };

      return (
        includesTerm(item.localization) ||
        includesTerm(item.subject) ||
        includesTerm(item.levelOfEducation) ||
        includesTerm(item.topic) ||
        includesTerm(item.schedule) ||
        includesTerm(item.priceRange)
      );
    });
    const url = `/search?priceRange=${priceRange}&localization=${localization}&subject=${subject}&educationLevel=${educationLevel}&topic=${topic}&schedule=${schedule}`;
    history.push(url, {
      filteredTutorData: filteredData,
      allTutorData: tutorsData.tutors,
    });
  };

  useEffect(() => {
    // Define a function to fetch tutor data
    const fetchTutorData = async () => {
      try {
        const response = await Axios.get(`${baseURL}/tutors`); // Replace with your actual API endpoint
        setTutorsData(response.data); // Update the state with fetched tutor data
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      }
    };

    // Call the function to fetch tutor data
    fetchTutorData();
  }, []); // Run this effect only once on component mount

  const handleLearnMoreClick = () => {
    console.log(showPopup);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={aboutClasses}>
        <h1 className={styles.aboutHeader}>What is StudyHub ?</h1>
        <p className={styles.aboutParagraph}>
          StudyHub is a project which uses some basic CRUD operations to create,
          read, upload and delete data using both frontend and backend side. It
          uses mongoDB database. The website is designed to filter the data
          received from the database.{" "}
          <strong>The project is not finished yet.</strong>
        </p>
        <div>
          <Button theme={theme} handleOnClick={handleLearnMoreClick}>
            Learn More
          </Button>
        </div>
      </div>
      <div className={generalFindFormClasses}>
        <form onSubmit={handleFindClick} className={styles.findFormWrapper}>
          <input
            type="text"
            placeholder="find keyword..."
            onKeyDown={(e) => e.key === "enter" && handleFindClick()}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <Button theme={theme} handleOnClick={handleFindClick}>
            Find
          </Button>
        </form>
      </div>
      <div className={styles.innerWrapper}>
        <div className={optionWrapperClasses}>
          <div className={styles.paragraph}>
            <p className={styles.par}>subject</p>
            <div className={styles.fontAwesomeIcon}>
              <FontAwesomeIcon icon={faCloud} style={{ color: "#1f5151" }} />
            </div>
          </div>
          <select
            className={selectClasses}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">select subject</option>
            <option value="Math">math</option>
            <option value="Programming">programming</option>
            <option value="English">english</option>
          </select>
        </div>
        <div className={optionWrapperClasses}>
          <div className={styles.paragraph}>
            <p className={styles.par}>level of education</p>
            <div
              className={styles.fontAwesomeIcon}
              id={styles.levelOfEducationIcon}
            >
              <FontAwesomeIcon
                icon={faLayerGroup}
                style={{ color: "#1f5151" }}
              />
            </div>
          </div>
          <select
            className={selectClasses}
            onChange={(e) => setEducationLevel(e.target.value)}
          >
            <option value="">select education level</option>
            <option value="University">university</option>
            <option value="High School">high school</option>
            <option value="Middle School">middle school</option>
          </select>
        </div>
        <div className={optionWrapperClasses}>
          <div className={styles.paragraph}>
            <p className={styles.par}>topic</p>
            <div className={styles.fontAwesomeIcon}>
              <FontAwesomeIcon icon={faKey} style={{ color: "#1f5151" }} />
            </div>
          </div>
          <select
            className={selectClasses}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select topic</option>
            <option value="React">react</option>
            <option value="Angular">angular</option>
            <option value="Vue">vue</option>
          </select>
        </div>
        <div className={optionWrapperClasses}>
          <div className={styles.paragraph}>
            <p className={styles.par}>localization</p>
            <div className={styles.fontAwesomeIcon}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#1f5151" }}
              />
            </div>
          </div>
          <select
            className={selectClasses}
            onChange={(e) => setLocalization(e.target.value)}
          >
            <option value="">Select localization</option>
            <option value="Zabrze">Zabrze</option>
            <option value="Giwice">Gliwice</option>
            <option value="Warszawa">Warszawa</option>
          </select>
        </div>
        <div className={optionWrapperClasses}>
          <div className={styles.paragraph}>
            <p className={styles.par}>schedule</p>
            <div className={styles.fontAwesomeIcon}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ color: "#1f5151" }}
              />
            </div>
          </div>
          <select
            className={selectClasses}
            onChange={(e) => setSchedule(e.target.value)}
          >
            <option value="">select schedule</option>
            <option value="Weekends">weekends</option>
            <option value="Afternoons">afternoons</option>
          </select>
        </div>
        <div className={optionWrapperClasses}>
          <div className={styles.paragraph}>
            <p className={styles.par}>price range</p>
            <div className={styles.fontAwesomeIcon} id={styles.priceRangeIcon}>
              <FontAwesomeIcon
                icon={faMoneyBill}
                style={{ color: "#1f5151" }}
              />
            </div>
          </div>
          <select
            className={selectClasses}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Select price range</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
          </select>
        </div>
        <div className={styles.optionWrapper}>
          <Button theme={theme} handleOnClick={handleSearchClick}>
            Search
          </Button>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <div className={popupWrapperClasses}>
          <div className={styles.popupContent}>
            <h2>Additional Information</h2>
            <p>Key features of StuddyHub include:</p>
            <ol>
              <li>Users can find tutors based on given criteria set in form</li>
              <li>User can register as: tutor or student.</li>
              <li>
                Registered user can login into user's endpoint or tutor's
                endpoint
              </li>
              <li>Tutors & students can change password</li>
              <li>Tutors & students can delete account</li>
              <li>Tutors can set some profile data about themselves</li>
              <li>Tutors can upload image file.</li>
            </ol>

            <Button theme={theme} handleOnClick={handleClosePopup}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
