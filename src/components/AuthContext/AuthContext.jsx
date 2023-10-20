import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children, setIsLoggedIn, isLoggedIn }) => {
  const token = localStorage.getItem("TOKEN");
  const logoutFun = () => {
    localStorage.removeItem("STATUS");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider
      value={{ token, logoutFun, setIsLoggedIn, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
