'use client';

import type React from 'react';
import type { Nullable, User } from '@/types/commons.types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthRepository } from '@/libs/services/auth.repository';
import { isApiError } from '@/libs/utils/catch.utils';
import { createSafeContext } from '@/libs/utils/createSafeContext';

type AuthContextProps = Nullable<{
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}>;

const [AuthContext, useAuth] = createSafeContext<AuthContextProps>('Auth');

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const authRepository = new AuthRepository();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authRepository.me();
        setUser(response);
        setIsAuthenticated(true);
      } catch (e) {
        if (isApiError(e) && e.status === 401) {
          setUser(null);
          setIsAuthenticated(false);
          router.replace('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
