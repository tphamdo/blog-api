import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext } from "react";

type AuthContextType = {
  saveToken: (newToken: string) => void;
  clearToken: () => void;
  isAuth: () => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const saveToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('jwt', newToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    }
  };

  const clearToken = () => {
    localStorage.removeItem('jwt');
    delete axios.defaults.headers.common["Authorization"]
  };

  const getToken = () => {
    return localStorage.getItem('jwt');
  };

  const isAuth = () => {
    const token = getToken();
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000; // Convert to seconds

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    return decodedToken.exp ? decodedToken.exp > currentTime : false;
  };

  // // Memoized value of the authentication context
  // const contextValue = useMemo(
  //   () => ({
  //     token,
  //     saveToken,
  //     clearToken,
  //     isAuthenticated,
  //   }),
  //   [token, saveToken, clearToken, isAuthenticated]
  // );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={{ saveToken, clearToken, isAuth }}> {children}</ AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
