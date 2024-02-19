import { remove } from "../api/getToken.js";

export async function logout() {
  try {
    remove("token");

    window.location.href = "/index.html";

    console.log("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
}
