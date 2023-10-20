import styles from "./Button.module.scss";

const Button = ({ theme, handleOnClick, children, id }) => {
  const btnClasses = `${styles.btn} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return (
    <button className={btnClasses} onClick={handleOnClick} id={id}>
      {children}
    </button>
  );
};
export default Button;
