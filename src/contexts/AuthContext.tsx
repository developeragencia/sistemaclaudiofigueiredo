
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

type AuthContextType = {
  isLoggedIn: boolean;
  userEmail: string | null;
  userRole: UserRole | null;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  currentUser: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedEmail = localStorage.getItem('userEmail');
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    
    if (storedLoggedIn === 'true' && storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
      setCurrentUser(storedEmail);
      
      if (storedRole) {
        setUserRole(storedRole);
      } else {
        setUserRole('admin');
        localStorage.setItem('userRole', 'admin');
      }
    }
  }, []);

  const login = (email: string, role: UserRole = 'admin') => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserRole(role);
    setCurrentUser(email);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserRole(null);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  };

  const updateUserRole = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userEmail, 
      userRole, 
      login, 
      logout,
      setUserRole: updateUserRole,
      currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
