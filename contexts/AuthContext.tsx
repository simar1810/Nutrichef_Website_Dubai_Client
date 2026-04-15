"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { api, clearTokens } from "@/lib/api";

export interface UserProfile {
  _id: string;
  tenantId: string;
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  gender?: string;
  dob?: string;
  heightCm?: number;
  weightKg?: number;
  targetWeightKg?: number;
  goal?: string;
  activityLevel?: string;
  dietPreference?: string;
  allergies?: string[];
  conditions?: string[];
  type?: string;
  roles?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  /** Bumped on logout so a late /user/profile response cannot repopulate `user` after tokens were cleared. */
  const authEpochRef = useRef(0);

  const fetchProfile = useCallback(async () => {
    const epoch = authEpochRef.current;
    try {
      const res = await api.get<UserProfile>("/user/profile");
      if (authEpochRef.current !== epoch) return;
      setUser(res.data);
    } catch {
      if (authEpochRef.current !== epoch) return;
      setUser(null);
      clearTokens();
    }
  }, []);

  const login = useCallback(
    async (accessToken: string, refreshToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      await fetchProfile();
    },
    [fetchProfile]
  );

  const logout = useCallback(() => {
    authEpochRef.current += 1;
    clearTokens();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        void fetchProfile().finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
