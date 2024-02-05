import { API_BASE_URL } from "./API_BASE_URL.js";
import { user } from "./user.js";
//---Base url---//

//End-points:
//Register: /api/v1/social/auth/register
//Login: /api/v1/social/auth/login

// ----------------------Register user

/****
 * API Call that register the user
 * @param {string} url
 * @param {any} userData
 * ```js
 * registerUser(registerUrl, userData);
 */
export async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log("Request payload:", postData);
    const response = await fetch(url, postData);
    if (!response.ok) {
      const errorJson = await response.json();
      const errorMessage = errorJson.message || "Bad Request";
      throw new Error(errorMessage);
    }
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
