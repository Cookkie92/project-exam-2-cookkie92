// auth.js
import axios from "axios";

// Function to create API key
export const createApiKey = async (accessToken) => {
  try {
    const response = await axios.post(
      "https://v2.api.noroff.dev/auth/create-api-key",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data.key;
  } catch (error) {
    console.error("Error creating API key:", error);
    throw new Error("Failed to create API key");
  }
};
