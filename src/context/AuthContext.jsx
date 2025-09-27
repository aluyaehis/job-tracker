import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('jobtracker_user');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('AuthContext: failed to parse stored user', err);
      return null;
    }
  });

  const login = (email) => {
    const safeEmail = email || 'guest@jobtracker.local';
    const newUser = { name: safeEmail.split('@')[0], email: safeEmail };
    setUser(newUser);
    localStorage.setItem('jobtracker_user', JSON.stringify(newUser));
    return Promise.resolve(newUser);
  };

  const register = (name, email) => {
    const safeEmail = email || 'guest@jobtracker.local';
    const newUser = { name: name || safeEmail.split('@')[0], email: safeEmail };
    setUser(newUser);
    localStorage.setItem('jobtracker_user', JSON.stringify(newUser));
    return Promise.resolve(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobtracker_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);

