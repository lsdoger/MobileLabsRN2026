import { createContext, useContext, useMemo, useState } from 'react';

import { addLog, setActor } from '@/data/store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login: (email) => {
        const name = email === 'test@ztu.edu.ua' ? 'Тестовий адміністратор' : email.split('@')[0];
        setActor(email);
        setUser({ name, email });
        addLog('login', 'Успішний вхід');
      },
      logout: () => {
        addLog('logout', 'Завершення сеансу');
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth потрібно викликати всередині AuthProvider');
  return ctx;
}
