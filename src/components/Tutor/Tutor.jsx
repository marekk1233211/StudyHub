import styles from "./Tutor.module.scss";
import { useLocation, Link } from "react-router-dom";
import Button from "../Button/Button";
import { baseURL } from "../config";
const Tutor = ({ theme }) => {
  const location = useLocation();
  const { selectedTutorData } = location.state ?? {};
  const wrapperClasses = `${styles.wrapper} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return (
    <div className={wrapperClasses}>
      <div className={styles.innerWrapper}>
        <div className={styles.profileInfo}>
          <h2>
            {selectedTutorData.name} {selectedTutorData.lastName}
          </h2>
          <div>
            <p>subject: {selectedTutorData.subject}</p>
            <p>education level: {selectedTutorData.levelOfEducation}</p>
            <p>topic: {selectedTutorData.topic}</p>
            <p>localization: {selectedTutorData.localization}</p>
            <p>schedule: {selectedTutorData.schedule}</p>
            <p>price: {selectedTutorData.priceRange}</p>
            <p>
              tutoring provided: {selectedTutorData.numberOfTutoringProvided}
            </p>
            <p>average rating: {selectedTutorData.avgRating}</p>
          </div>
        </div>
        <div className={styles.img}>
          <img
            src={`${baseURL}/api/images/${selectedTutorData.image}`}
            alt="Profile Image"
          />
        </div>
      </div>
      <div class={styles.btn}>
        <Link to="/" className={styles.linkComp}>
          <Button theme={theme} id="backBtn">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Tutor;
