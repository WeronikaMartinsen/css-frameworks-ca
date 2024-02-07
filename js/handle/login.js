import { login } from "../api/login.js";

export function loginFormListener() {
  //This function grab the user from the form

  const loginForm = document.querySelector("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const loginForm = event.target;
      const loginFormData = new FormData(loginForm);

      const profile = Object.fromEntries(loginFormData.entries());
      console.log(profile);

      login(profile);
    });
  }
}
