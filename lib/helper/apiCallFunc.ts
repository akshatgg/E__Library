// lib/authService.ts
import {apiFetch} from "./api";

type UserPayload = {
  email?: string;
  password?: string;
  displayName?: string;
  role?: string;
};

export const AuthService = {
  // -------------------- Auth --------------------
  register: (user: {
    email: string;
    password: string;
    displayName: string;
    role?: string;
  }) => apiFetch("/api/auth/register", {method: "POST", body: user}),

  verifyOtp: (email: string, otp: string) =>
    apiFetch("/api/auth/register", {method: "PUT", body: {email, otp}}),

  login: (email: string, password: string) =>
    apiFetch("/api/auth/login", {method: "POST", body: {email, password}}),

  // -------------------- Delete Account --------------------
  requestDeleteOtp: (userId: string) =>
    apiFetch(`/api/delete/${userId}`, {method: "POST"}),

  deleteAccount: (userId: string, otp: string) =>
    apiFetch(`/api/delete/${userId}`, {method: "DELETE", body: {otp}}),

  // -------------------- Password Reset --------------------
  requestPasswordResetOtp: (email: string) =>
    apiFetch("/api/auth/reset-password", {method: "POST", body: {email}}),

  resetPassword: (email: string, otp: string, password: string) =>
    apiFetch("/api/auth/reset-password", {
      method: "PUT",
      body: {email, otp, password},
    }),

  // -------------------- User Profile --------------------
  getUser: (id: string) => apiFetch(`/api/auth/user/${id}`, {method: "GET"}),

  updateUser: (id: string, data: UserPayload) =>
    apiFetch(`/api/auth/user/${id}`, {method: "PATCH", body: data}),

  getTransactions: (userId: string) =>
    apiFetch(`/api/user/${userId}/transactions`, {method: "GET"}),
    
  logout: (id: string) => apiFetch(`/api/auth/user/${id}`, {method: "POST"}),
};
