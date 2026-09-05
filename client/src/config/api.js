/**
 * Centralized API configuration.
 * Uses VITE_API_BASE_URL from environment variables (e.g., Railway deployment URL),
 * and defaults to empty string for local development with Vite proxy.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')
  : '';
