import { API_SOCIAL_URL } from "./constants.js";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to register. Status: ${response.status}`);
    }

    const result = await response.json();

    // Assuming the registration was successful, redirect the user
    window.location.href = `index.html`;

    alert("You are now registered!");
  } catch (error) {
    console.error("Error during registration:", error.message);
    // Handle the error as needed (e.g., show an error message to the user)
  }
}
