const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const registerForm = event.target;
  const registerFormData = new FormData(registerForm);

  const profile = Object.fromEntries(registerFormData());
  console.log(profile);
});
