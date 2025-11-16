// Placeholder OpenAI service - replace with your implementation.
// DO NOT commit API keys here. Use environment variables / EAS secrets.
import axios from 'axios';

const API_BASE = 'https://api.openai.com/v1'; // example, change if needed

async function sendMessage(text, history=[]) {
  // This function should call your backend or directly call OpenAI with secure key.
  // For security it's best to have your own server that stores the API key.
  // Here we return a dummy response for testing.
  return { text: "Ez egy példa válasz: " + text };
}

export default { sendMessage };
