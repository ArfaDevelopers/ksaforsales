/**
 * API Configuration
 *
 * The OpenAI API key is loaded from environment variables (.env file)
 * Get your API key from: https://platform.openai.com/api-keys
 */

export const API_CONFIG = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
};
