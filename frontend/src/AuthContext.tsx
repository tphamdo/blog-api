// AuthContext.js
import { createContext, useState, useContext } from 'react';

type AuthContextType = {
  token: string | null;
  saveToken: (newToken: string) => void;
  clearToken: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode; // Explicitly type the children prop
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('jwt', newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem('jwt');
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
