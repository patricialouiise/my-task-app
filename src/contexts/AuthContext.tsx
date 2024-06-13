"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback
} from "react";
import { useRouter } from "next/navigation";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface AuthContextType {
  userId: number | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const login = (token: string) => {
    localStorage.setItem("token", token);

    try {
      const decodedToken: any = jwtDecode<JwtPayload>(token);

      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUserId(decodedToken.sub);
        router.push("/tasks");
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUserId(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: any = jwtDecode<JwtPayload>(token);

        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUserId(decodedToken.sub);
          router.push("/tasks");
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [logout, router]);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
