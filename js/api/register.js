import { API_BASE_URL, REGISTER } from "./constants.js";

/**
 * Registers a new user by sending a POST request to the registration API endpoint.
 * @function register
 * @param {object} user - An object containing user registration data.
 * @param {string} user.username - The username for the new user.
 * @param {string} user.email - The email address for the new user.
 * @param {string} user.password - The password for the new user.
 * @returns {Promise<void>} A Promise that resolves after the registration is complete.
 * @throws {Error} Throws an error if the registration fails or encounters an error.
 */

export async function register(user) {
  const registerURL = API_BASE_URL + REGISTER;
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(registerURL, postData);
    const json = await response.json();
    const status = json.statusCode;
    if (response.ok) {
      alert("You are register now! You can log in!");
      window.location.href = "/index.html";
    } else if (status === 400) {
      alert("Your profile already exist.");
    }
  } catch (error) {
    console.error(error);
  }
}
