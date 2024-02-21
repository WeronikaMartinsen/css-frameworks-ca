import { API_BASE_URL, REGISTER } from "./constants.js";

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
    } else if (status === 400) {
      alert("Your profile already exist.");
    }
  } catch (error) {
    console.error(error);
  }
}
