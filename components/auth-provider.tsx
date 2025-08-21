"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {setCookies, getCookie, removeCookies} from "cookies-next";
import {AuthService} from "@/lib/helper/apiCallFunc";
import {useRouter} from "next/navigation";

export type User = {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isVerified?: boolean;
  isActive?: boolean;
  credits?: string;
};

type ApiResponse<T = any> = {
  success: boolean;
  token: string;
  user: T;
  message: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    displayName: string;
    role?: string;
  }) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    otp: string,
    password: string
  ) => Promise<boolean>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const saveToken = (token: string) => {
    setToken(token);
    setCookies("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  const refreshUser = useCallback(async () => {
    const token = getCookie("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = (await AuthService.getUser(token as string)) as ApiResponse<{
        user: User;
      }>;
      if (res.success && res.user) setUser(res.user);
      else setUser(null);
    } catch (err) {
      console.error("Refresh user failed:", err);
      removeCookies("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const res = (await AuthService.login(email, password)) as ApiResponse<{
        user: User;
        token: string;
        message: string;
      }>;
      if (!res.success) {
        setError(res.message || "Login failed");
        return false;
      }
      if (res.success && !res.user?.isVerified) {
        setError("Account not verified. Please enter OTP.");
        return false;
      }
      if (res.success) {
        setUser(res?.user);

        router.push("/");
        if (res.token) saveToken(res.token);
      }
      return true;
    } catch (err: any) {
      setError(err.message || "Login error");
      return false;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      removeCookies("token");
      router.push("/auth/signin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    displayName: string;
    role?: string;
  }) => {
    setError(null);
    try {
      const res = (await AuthService.register(data)) as ApiResponse<{
        message?: string;
      }>;
      if (!res.success) setError(res.message || "Registration failed");
      return res.success;
    } catch (err: any) {
      setError(err.message || "Registration error");
      return false;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setError(null);
    try {
      const res = (await AuthService.verifyOtp(email, otp)) as ApiResponse<{
        user: User;
        token: string | null;
      }>;
      if (!res.success) {
        setError(res.message || "Invalid OTP");
        return false;
      }
      if (res.user) {
        setUser(res.user);
        saveToken(res.token);
        router.push("/");
      }
      return true;
    } catch (err: any) {
      setError(err.message || "OTP verification error");
      return false;
    }
  };

  const requestPasswordReset = async (email: string) => {
    setError(null);
    try {
      const res = (await AuthService.requestPasswordResetOtp(
        email
      )) as ApiResponse;
      if (!res.success) setError(res.message || "Failed to send OTP");
      return res.success;
    } catch (err: any) {
      setError(err.message || "Request password reset error");
      return false;
    }
  };

  const resetPassword = async (
    email: string,
    otp: string,
    password: string
  ) => {
    setError(null);
    try {
      const res = (await AuthService.resetPassword(
        email,
        otp,
        password
      )) as ApiResponse;
      if (!res.success) setError(res.message || "Reset password failed");
      return res.success;
    } catch (err: any) {
      setError(err.message || "Reset password error");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        token,
        loading,
        login,
        logout,
        register,
        verifyOtp,
        requestPasswordReset,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
