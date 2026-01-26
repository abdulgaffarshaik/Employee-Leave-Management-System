import { request } from "../../../core/api/http";

export const registerUser = (data) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const loginUser = (data) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetPassword = (data) =>
  request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
