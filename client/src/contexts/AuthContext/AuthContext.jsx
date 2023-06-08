import { ACCESS_TOKEN } from "../../constants/constants";
import { getLocalStorageItem } from "../../services/LocalStorage/localStorageService";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getLocalStorageItem(ACCESS_TOKEN));
  }, [])

  const value = {
    token,
    setToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};