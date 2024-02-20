import { remove } from "./storeToken.js";

export function logout() {
  const logoutBtn = document.querySelector("#logout");

  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Logout button clicked");
    remove("token");
    remove("profile");
    window.location.href = "/index.html";
  });
}
