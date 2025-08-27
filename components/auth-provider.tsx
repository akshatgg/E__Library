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
  credits?: number; // Changed from string to number
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
  updateProfile: (data: {
    email: string;
    displayName: string;
    role: string;
  }) => Promise<ApiResponse>;
  getTransactions: () => Promise<any[]>;
  refreshUser: () => Promise<User | null>; // ✅ return type matches setUser
  isTokenValid: () => boolean; // Utility to check if current token is valid
  useCredits: (amount: number) => Promise<void>; // Credit usage function
  addCredits: (amount: number) => Promise<void>; // Credit addition function
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
      maxAge: 60 * 60 * 24 * 2, // 2 days as requested
    });
  }, []);

  const refreshUser = useCallback(async (): Promise<User | null> => {
    const token = getCookie("token") as string | undefined;
    if (!token) {
      console.log("No token found in cookies");
      return null;
    }

    // First, validate the token before continuing
    try {
      const decoded = jwtDecode<JwtPayload & Partial<User>>(token);

      // Check if token is expired
      if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        console.log("Token expired:", new Date(decoded.exp! * 1000));
        removeCookies("token");
        return null;
      }

      // Token is valid, extend it
      saveToken(token);
    } catch (tokenError) {
      console.error("Invalid token:", tokenError);
      removeCookies("token");
      return null;
    }

    try {
      setLoading(true);

      // First try to get the latest user data from the server
      try {
        if (user?.id) {
          console.log("Refreshing user data for ID:", user.id);
          const response = await AuthService.getUser(user.id);
          console.log("User API response:", response);

          if (response.success && response.data) {
            const userData = response.data as User;
            console.log(
              "Raw user data from API:",
              userData,
              "Credits type:",
              typeof userData.credits
            );

            // Ensure credits is stored as a number
            if (userData.credits !== undefined) {
              userData.credits =
                typeof userData.credits === "number"
                  ? userData.credits
                  : parseInt(String(userData.credits)) || 0;
              console.log("Processed credits value:", userData.credits);
            } else {
              console.log("Credits field is undefined in API response");
              userData.credits = 0;
            }

            console.log("User data refreshed from server:", userData);
            setUser(userData);
            return userData;
          } else {
            console.log("API response failed or contains no data");
          }
        } else {
          console.log("No user ID available for refresh");
        }
      } catch (serverError) {
        console.error(
          "Failed to get user data from server, falling back to token:",
          serverError
        );
      }

      // Fallback to token data
      const decoded = jwtDecode<JwtPayload & Partial<User>>(token); // ✅ allow optional properties

      // Check token expiration with detailed logging
      if (!decoded.exp) {
        console.error("Token missing expiration");
        throw new Error("Invalid token: missing expiration");
      }

      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeRemaining = expiryTime - currentTime;

      // If token is expired or expires in less than 5 minutes
      if (timeRemaining <= 0) {
        console.error(
          `Token expired at ${new Date(
            expiryTime
          ).toLocaleString()}, ${Math.abs(
            Math.round(timeRemaining / 1000 / 60)
          )} minutes ago`
        );
        throw new Error("Token expired");
      }

      // Log warning if token expires soon (less than 30 minutes)
      if (timeRemaining < 30 * 60 * 1000) {
        console.warn(
          `Token expires soon: ${Math.round(
            timeRemaining / 1000 / 60
          )} minutes remaining`
        );
      }

      const userData = {
        id: decoded.id as string,
        displayName: decoded.displayName as string,
        email: decoded.email as string,
        isActive: decoded.isActive,
        lastLoggedin: decoded.lastLoggedin as string,
        isVerified: decoded.isVerified,
        role: decoded.role as string,
        credits: decoded.credits,
      };

      // Update the current user
      setUser(userData);
      return userData;
    } catch (err) {
      console.error("JWT decode error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [saveToken, user?.id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await refreshUser();

        // If no user data is returned (token invalid/expired), clear auth state
        if (!userData) {
          // Clear any existing tokens and user data
          removeCookies("token");
          setAccess_token(null);
          setUser(null);

          // Redirect to sign in page if we're not already there
          if (window.location.pathname !== "/auth/signin") {
            router.push("/auth/signin");
          }
        } else {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error during auth refresh:", error);
        // Clear auth state on error
        removeCookies("token");
        setAccess_token(null);
        setUser(null);
        router.push("/auth/signin");
      }
    };

    fetchUser();

    // Setup periodic token validation (every 5 minutes)
    const tokenValidator = setInterval(fetchUser, 5 * 60 * 1000);

    return () => clearInterval(tokenValidator);
  }, [refreshUser, router]);

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
    setLoading(true);
    try {
      // Try to call the logout API, but proceed with local logout even if it fails
      try {
        const res = (await AuthService.logout(id)) as ApiResponse<null>;
        if (!res.success) {
          console.warn("API logout returned error:", res.message);
          // Continue with logout process anyway
        }
      } catch (apiError) {
        console.error("API logout error:", apiError);
        // Continue with logout process anyway
      }

      // Always clear local state regardless of API response
      setUser(null);
      setAccess_token(null);

      // Clear all auth cookies
      removeCookies("token", {path: "/"});

      // Redirect to sign-in page
      router.push("/auth/signin");
    } catch (err) {
      console.error("Logout error:", err);
      // Still attempt to clear cookies on error
      removeCookies("token", {path: "/"});
    } finally {
      setLoading(false);
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

  const updateProfile = async (data: {
    email: string;
    displayName: string;
    role: string;
  }) => {
    setError(null);
    if (!user?.id) {
      setError("User not authenticated");
      return false;
    }

    try {
      setLoading(true);
      const res = (await AuthService.updateUser(
        user.id,
        data
      )) as ApiResponse<User>;

      if (!res.success && res.message.includes("OTP")) {
        setError(res.message || "OTP verification required");
        return res;
      }

      if (!res.success) {
        setError(res.message || "Profile update failed");
        return res;
      }

      // Update local user state with new data
      if (res.user) {
        setUser((prevUser) => ({
          ...prevUser!,
          ...res.user,
        }));
      }

      return res;
    } catch (err: any) {
      setError(err.message || "Profile update error");
      return err;
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = useCallback(async () => {
    setError(null);
    if (!user?.id) {
      setError("User not authenticated");
      return [];
    }

    try {
      setLoading(true);
      const response = await AuthService.getTransactions(user.id);

      if (!response.success) {
        setError(response.message || "Failed to fetch transactions");
        return [];
      }

      return response.data ? (response.data as any[]) : [];
    } catch (err: any) {
      setError(err.message || "Error fetching transactions");
      console.error("Transaction fetch error:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user?.id, setError, setLoading]); // Add dependencies

  // Utility function to check if the token is valid
  const isTokenValid = useCallback((): boolean => {
    try {
      const token = getCookie("token") as string | undefined;
      if (!token) return false;

      const decoded = jwtDecode<JwtPayload>(token);

      // Check if token is expired
      if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        console.log("Token validation failed: Token expired");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  }, []);

  // Credit management functions
  const useCredits = useCallback(
    async (amount: number): Promise<void> => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      if (!user.credits || user.credits < amount) {
        throw new Error(
          `Insufficient credits. You need ${amount} credits but have ${
            user.credits || 0
          }.`
        );
      }

      try {
        // Update credits in the backend
        const response = await AuthService.updateUser(user.id, {
          credits: user.credits - amount,
        });

        if (!response.success) {
          throw new Error(response.message || "Failed to update credits");
        }

        // The response.data contains the actual response from the API
        const apiData = response.data as any;

        // Save the new token if provided
        if (apiData?.token) {
          saveToken(apiData.token);
        }

        // Update local user state with the response data
        if (apiData?.user) {
          setUser((prevUser) =>
            prevUser
              ? {
                  ...prevUser,
                  ...apiData.user,
                  credits: apiData.user.credits,
                }
              : null
          );
        } else {
          // Fallback to manual update if user data not in response
          setUser((prevUser) =>
            prevUser
              ? {
                  ...prevUser,
                  credits: (prevUser.credits || 0) - amount,
                }
              : null
          );
        }
      } catch (error) {
        console.error("Error using credits:", error);
        throw error;
      }
    },
    [user]
  );

  const addCredits = useCallback(
    async (amount: number): Promise<void> => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        // Update credits in the backend
        const response = await AuthService.updateUser(user.id, {
          credits: (user.credits || 0) + amount,
        });

        if (!response.success) {
          throw new Error(response.message || "Failed to add credits");
        }

        // The response.data contains the actual response from the API
        const apiData = response.data as any;

        // Save the new token if provided
        if (apiData?.token) {
          saveToken(apiData.token);
        }

        // Update local user state with the response data
        if (apiData?.user) {
          setUser((prevUser) =>
            prevUser
              ? {
                  ...prevUser,
                  ...apiData.user,
                  credits: apiData.user.credits,
                }
              : null
          );
        } else {
          // Fallback to manual update if user data not in response
          setUser((prevUser) =>
            prevUser
              ? {
                  ...prevUser,
                  credits: (prevUser.credits || 0) + amount,
                }
              : null
          );
        }
      } catch (error) {
        console.error("Error adding credits:", error);
        throw error;
      }
    },
    [user]
  );

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
        updateProfile,
        getTransactions,
        refreshUser,
        isTokenValid, // Added token validation utility
        useCredits, // Credit management functions
        addCredits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
