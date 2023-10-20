import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginRegisterPage from "./components/LoginRegisterPage/LoginRegisterPage";
import HomePage from "./components/HomePage/HomePage";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import TutorFound from "./components/TutorFound/TutorFound";
import Tutor from "./components/Tutor/Tutor";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import StudentPage from "./components/StudentPage/StudentPage";
import TutorPage from "./components/TutorPage/TutorPage";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { useState, createContext } from "react";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appWrapperClasses = `appWrapper ${theme === "dark" ? "dark" : "light"}`;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <AuthProvider isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
          <div className={appWrapperClasses}>
            <Layout
              theme={theme}
              id={theme}
              header={
                <Header id={theme} toggleTheme={toggleTheme} theme={theme} />
              }
              Switch={
                <Switch>
                  <Route exact path="/">
                    <HomePage theme={theme} />
                  </Route>
                  <Route path="/loginRegister">
                    <LoginRegisterPage theme={theme} />
                  </Route>
                  <Route path="/search">
                    <TutorFound theme={theme} />
                  </Route>
                  <Route path="/tutor">
                    <Tutor theme={theme} />
                  </Route>
                  <Route path="/termsOfService">
                    <TermsOfService theme={theme} />
                  </Route>
                  <Route path="/registerPage">
                    <RegisterPage theme={theme} />
                  </Route>
                  <Route path="/tutorIn">
                    <TutorPage theme={theme} />
                  </Route>
                  {/* <ProtectedRoutes
                    path="/studentIn"
                    component={StudentPage}
                    theme={theme}
                  />
                  <ProtectedRoutes
                    path="/tutorIn"
                    component={TutorPage}
                    theme={theme}
                  /> */}
                </Switch>
              }
              footer={<Footer theme={theme} />}
            />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
