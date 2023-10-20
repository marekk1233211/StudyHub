import styles from "./Header.module.scss";
import EBLogo from "../../images/Studdy HubB6.png";
import EBLogo2 from "../../images/Studdy HubB1.png";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import AccountHamburger from "../AccountHamburger/AccountHamburger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBucket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../AuthContext/AuthContext";

function Header({ theme, toggleTheme, cookies, token }) {
  const { isLoggedIn, logoutFun } = useContext(AuthContext);
  const navigationClasses = `${styles.navigation} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  const logoClasses = `${styles.inage} ${
    theme === "dark" ? styles.dark : styles.light
  }`;
  return (
    <div className={styles.wrapper}>
      <nav className={navigationClasses}>
        <Link to="/" className={styles.linkComp}>
          <div className={styles.image}>
            {theme === "dark" ? (
              <img src={EBLogo2} alt="Logo"></img>
            ) : (
              <img src={EBLogo} alt="Logo"></img>
            )}
          </div>
        </Link>
        <Link to="/" className={styles.linkComp}>
          <p className={styles.siteName}>STUDYHUB</p>
        </Link>
        {isLoggedIn ? (
          <div className={styles.logHam}>
            <AccountHamburger
              theme={theme}
              cookies={cookies}
              token={token}
              logoutFun={logoutFun}
            />
          </div>
        ) : (
          <Link to="/loginRegister" className={styles.linkComp}>
            <div className={styles.logHam}>
              <Button theme={theme}>login</Button>
            </div>
          </Link>
        )}
      </nav>
      <div className={styles.bucketFontAwesome}>
        <FontAwesomeIcon
          icon={faBucket}
          style={
            theme === "dark"
              ? { color: "#ffefd7", fontSize: "24px" }
              : { color: "#ffefd7", fontSize: "24px" }
          }
          onClick={toggleTheme}
        />
      </div>
    </div>
  );
}

export default Header;
