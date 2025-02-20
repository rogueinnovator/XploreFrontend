import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const OwnerDataContext = createContext();
const OwnerContextProvider = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <OwnerDataContext.Provider
        value={{
          user,
          setUser,
          logOut,
        }}
      >
        {children}
      </OwnerDataContext.Provider>
    </>
  );
};

export default OwnerContextProvider;

export const useOwnerContext = () => {
  return useContext(OwnerDataContext);
};
