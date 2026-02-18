// src/services/auth.js
import { apiRequest } from "./APIService";

/**
 * Handles user login.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<object|null>} User data and token on success, null on failure.
 */
export async function login(email, password) {
  try {
    const data = await apiRequest(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(data, "Login response");

    // Agar backend token send kare, localStorage me save karo
    if (data?.user?.token) {
      localStorage.setItem("userToken", data.user.token);
      localStorage.setItem("userName", data.user.name || "");
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
}
