import styles from "./Layout.module.scss";
const Layout = ({ header, Switch, footer, theme }) => {
  const backgroundClasses = `${styles.background} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return (
    <div id={styles.id} className={styles.Layout}>
      <div className={backgroundClasses}></div>
      <div className={styles.container}>{header}</div>
      <div className={styles.container}>{Switch}</div>
      <div className={styles.container}>{footer}</div>
    </div>
  );
};

export default Layout;
