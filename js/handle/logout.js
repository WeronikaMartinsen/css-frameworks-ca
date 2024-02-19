import { logout } from "../api/logout.js";

export function logoutFormListener() {
  console.log("Logout form listener initialized");

  const logoutLinks = document.querySelectorAll(".logoutButton");

  if (logoutLinks.length > 0) {
    console.log(`${logoutLinks.length} logout links found`);

    logoutLinks.forEach((link) => {
      console.log("Adding click event listener to link");

      link.addEventListener("click", async (event) => {
        console.log("Logout link clicked");
        event.preventDefault(); // Prevent the default anchor behavior
        await logout();
      });
    });
  } else {
    console.log("No logout links found");
  }
}
