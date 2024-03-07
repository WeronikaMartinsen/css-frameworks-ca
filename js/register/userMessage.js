export function setupInputValidation() {
  document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");

    if (!nameInput || !emailInput || !passwordInput) {
      console.error("One or more input elements not found.");
      return;
    }

    nameInput.addEventListener("input", function () {
      validateInput(
        nameInput,
        /^[\w]+$/,
        "Name can only contain letters, numbers, and underscores."
      );
    });

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
        document.getElementById("passwordFeedback").textContent = errorMessage;
      }
    }
  });
}
