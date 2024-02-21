import { API_BASE_URL, LOGIN } from "./constants.js";

import * as storage from "./storeToken.js";

export async function login(user) {
  const loginURL = API_BASE_URL + LOGIN;
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(loginURL, postData);
    const json = await response.json();
    if (response.ok) {
      storage.save("token", json.accessToken);
      storage.save("profile", {
        userName: json.name,
        userEmail: json.email,
        userAvatar: json.avatar,
      });

      window.location.href = "feed/index.html";
    } else {
      const status = json.statusCode;
      if (status === 401) {
        `Wrong email or password!`;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
