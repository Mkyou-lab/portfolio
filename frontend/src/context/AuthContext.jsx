import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      try {
        const res = await getMe();
        setUser(res.data.data);
      } catch {
        localStorage.removeItem('portfolio_token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = (userData, token) => {
    localStorage.setItem('portfolio_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);