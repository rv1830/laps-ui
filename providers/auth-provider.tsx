'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyUser = async () => {
    try {
      const data = await authService.checkStatus();
      setUser(data.user);
      return data;
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);