document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const email = form.querySelector("#email");
      const password = form.querySelector("#password");
      const errorMessage = form.querySelector("#errorMessage");
      const errorMessagePassword = form.querySelector("#errorMessagePassword");
      const errors = [];

      if (email.value.trim() === "") {
        errors.push("Email required");
      }

      if (password.value.length < 8) {
        errors.push("Password must be at least 8 characters");
      }

      if (errors.length > 0) {
        e.preventDefault();
        errorMessage.removeAttribute("hidden");
        errorMessagePassword.removeAttribute("hidden");
        errorMessage.innerHTML = errors.join(", ");
      }
    });
  });
});
