import { register } from "../api/register.js";

export function registerUser() {
  const getForm = document.querySelector("#registerForm");

  if (getForm) {
    getForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;

      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      const user = {
        name,
        email,
        password,
      };

      register(user);
    });
  }
}
