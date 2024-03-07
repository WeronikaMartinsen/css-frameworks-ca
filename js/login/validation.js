export function setupLoginValidation() {
  document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {
      console.error("One or more input elements not found.");
      return;
    }

    emailInput.addEventListener("input", function () {
      validateInput(
        emailInput,
        /^[\w\-.]+@(stud\.)?noroff\.no$/,
        "Email must contain endpoint @stud.noroff.no or @noroff.no."
      );
    });

    passwordInput.addEventListener("input", function () {
      validateInput(
        passwordInput,
        /.{8,}/,
        "Password must be at least 8 characters long."
      );
    });

    function validateInput(inputElement, pattern, errorMessage) {
      const isValid = pattern.test(inputElement.value);
      updateInputStyle(inputElement, isValid, errorMessage);
    }

    function updateInputStyle(inputElement, isValid, errorMessage) {
      if (isValid) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
      } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
      }
    }
  });
}
