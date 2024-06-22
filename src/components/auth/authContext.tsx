import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  currentUserId: string | null;
  login: (userId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUserId: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const login = (userId: string) => {
    setIsAuthenticated(true);
    setCurrentUserId(userId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUserId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
