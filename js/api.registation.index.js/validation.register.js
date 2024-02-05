import { registerUser } from "./api.registration.js";
import { API_BASE_URL } from "./API_BASE_URL.js";
import { user } from "./user.js";

const registerForm = document.getElementById("registerForm");

const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

const nameError = document.getElementById("nameError-register");
const emailError = document.getElementById("emailError-register");
const passwordError = document.getElementById("passwordError-register");

const submitButton = document.getElementById("submitButton");

// Add 'input' event listeners to trigger validation on user input

registerName.addEventListener("input", validateForm);
registerEmail.addEventListener("input", validateForm);
registerPassword.addEventListener("input", validateForm);

function validateForm() {
  // Validate User Name
  if (checkUserName(registerName.value)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  // Validate User Email
  if (validateEmail(registerEmail.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  // Validate User Password
  if (checkUserPassword(registerPassword.value, 8)) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  // Enable or disable the submit button based on form validity
  submitButton.disabled = !isFormValid();
}

function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
  return regEx.test(email);
}

function checkUserName(value) {
  const regExt = /^[a-zA-Z0-9_]*$/;
  return value.trim().length > 0 && regExt.test(value);
}

function checkUserPassword(password, minLength) {
  return password.length >= minLength;
}

function isFormValid() {
  return (
    checkUserName(registerName.value) &&
    validateEmail(registerEmail.value) &&
    checkUserPassword(registerPassword.value, 8)
  );
}

// Add 'submit' event listener to the form
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Only submit the form if it is valid
  if (isFormValid()) {
    try {
      const result = await registerUser(
        `${API_BASE_URL}/api/v1/social/auth/register`,
        user
      );

      if (!result.ok) {
        throw new Error("HTTP error" + result.status);
      }

      const json = await result.json();
      console.log("json", json);

      window.location.href = "./profile.html";
      return json;
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error message
    }
  }
});
