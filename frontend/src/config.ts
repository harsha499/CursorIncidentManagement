// Configuration file for environment variables
// This approach uses import.meta.env which is standard for Vite-based tools

declare const __API_URL__: string;

export const config = {
  apiUrl: typeof __API_URL__ !== 'undefined' ? __API_URL__ : 'https://genieimsserver.onrender.com/api',
};

