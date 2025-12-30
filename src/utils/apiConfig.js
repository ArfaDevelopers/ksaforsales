/**
 * API Configuration
 *
 * IMPORTANT: Add your OpenAI API key below
 * Get your API key from: https://platform.openai.com/api-keys
 *
 * For production, consider using environment variables or a secure backend endpoint
 */

export const API_CONFIG = {
  // Replace 'YOUR_API_KEY_HERE' with your actual OpenAI API key
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};

// Alternative: If you want to use environment variables, uncomment below:
// export const API_CONFIG = {
//   OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY || ''
// };
