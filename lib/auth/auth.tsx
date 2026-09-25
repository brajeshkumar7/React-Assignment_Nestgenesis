"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/auth";

type AuthContextType = { user: User | null; ready: boolean; setSession: (user: User) => void; logout: () => void };
const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "product-admin-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved) as User); } catch { window.localStorage.removeItem(STORAGE_KEY); }
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    ready,
    setSession: (nextUser) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      window.localStorage.setItem("product-admin-token", nextUser.accessToken);
      setUser(nextUser);
    },
    logout: () => {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("product-admin-token");
      setUser(null);
    },
  }), [user, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
