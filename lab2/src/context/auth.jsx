import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Глобальний стан авторизації: доступний з будь-якого екрана через useAuth()
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login: (email) => {
        setUser({ email });
        setIsAuthenticated(true);
      },
      logout: () => {
        setUser(null);
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth потрібно викликати всередині AuthProvider');
  return ctx;
}
