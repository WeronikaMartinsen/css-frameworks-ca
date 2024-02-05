import { API_BASE_URL } from "./API_BASE_URL.js";
import { user } from "./user.js";

export async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    if (response.ok) {
      //  if Works, return data
    } else {
      throw new Error(response.errors[0].message);
    }
    localStorage.setItem("accessToken", accessToken);
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}
loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
