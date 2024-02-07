import { register } from "../api/registration.js";

export function registerFormListener() {
  //This function grab the user form the form

  const registerForm = document.querySelector("#registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const registerForm = event.target;
      const registerFormData = new FormData(registerForm);

      const profile = Object.fromEntries(registerFormData.entries());
      console.log(profile);

      // Now sent the user it to the API

      register(profile);
    });
  }
}
