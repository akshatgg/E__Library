"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {setCookies, removeCookies, getCookie} from "cookies-next";
import {AuthService} from "@/lib/helper/apiCallFunc";
import {useRouter} from "next/navigation";
import {jwtDecode, JwtPayload} from "jwt-decode"; // ✅ fixed import

export type User = {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isVerified?: boolean;
  isActive?: boolean;
  credits?: string;
  lastLoggedin: string;
};

type ApiResponse<T = any> = {
  success: boolean;
  token: string;
  user: T;
  message: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  access_token: string | null;
  login: (email: string, password: string) => Promise<ApiResponse>;
  logout: (id: string) => Promise<void>;
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
  refreshUser: () => Promise<User | null>; // ✅ return type matches setUser
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
  const [access_token, setAccess_token] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const saveToken = useCallback((token: string) => {
    setAccess_token(token);
    setCookies("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }, []);

  const refreshUser = useCallback(async (): Promise<User | null> => {
    const token = getCookie("token") as string | undefined;
    if (!token) return null;
    saveToken(token); // extend cookie

    try {
      setLoading(true);

      const decoded = jwtDecode<JwtPayload & Partial<User>>(token); // ✅ allow optional properties

      if (!decoded.exp || decoded.exp * 1000 < Date.now())
        throw new Error("Token expired");

      return {
        id: decoded.id as string,
        displayName: decoded.displayName as string,
        email: decoded.email as string,
        isActive: decoded.isActive,
        lastLoggedin: decoded.lastLoggedin as string,
        isVerified: decoded.isVerified,
        role: decoded.role as string,
      };
    } catch (err) {
      console.error("JWT decode error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [saveToken]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await refreshUser();
      setUser(userData);
    };

    fetchUser();
  }, [refreshUser]);

  const login = async (
    email: string,
    password: string
  ): Promise<ApiResponse<User | null>> => {
    setError(null);
    try {
      const res = (await AuthService.login(
        email,
        password
      )) as ApiResponse<User>;

      if (!res.success && !res.user) {
        setError(res.message || "Login failed");
        return {
          ...res,
          user: null, // ensure user is null on failure
        };
      }

      if (!res.user?.isVerified) {
        setError("Account not verified. Please enter OTP.");
        return {
          ...res,
          user: null, // optional, failure case
        };
      }

      // success case
      setUser(res.user);
      if (res.token) saveToken(res.token);
      router.push("/");

      return res;
    } catch (err: any) {
      setError(err.message || "Login error");
      return {
        success: false,
        message: err.message || "Login error",
        user: null,
        token: "",
      };
    }
  };

  const logout = async (id: string): Promise<void> => {
    try {
      const res = (await AuthService.logout(id)) as ApiResponse<null>;
      if (!res.success) {
        setError(res.message || "Logout failed");
        return;
      }
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
      const res = (await AuthService.register(data)) as ApiResponse<null>;
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
      const res = (await AuthService.verifyOtp(
        email,
        otp
      )) as ApiResponse<User>;
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
      )) as ApiResponse<null>;
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
      )) as ApiResponse<null>;
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
        access_token,
        loading,
        login,
        logout,
        register,
        verifyOtp,
        requestPasswordReset,
        resetPassword,
        refreshUser, // ✅ added to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
