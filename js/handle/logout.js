import { logout } from "../api/logout.js";

export function logoutFormListener() {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        // Call the logout function from logout.js
        await logout();
      } catch (error) {
        console.error("Error during logout form submission:", error.message);
      }
    });
  }
}
