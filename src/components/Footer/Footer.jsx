import styles from "./Footer.module.scss";
const Footer = ({ theme }) => {
  const footerClasses = `${styles.footer} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return <div className={footerClasses}>Created by Marek Korczak</div>;
};

export default Footer;
