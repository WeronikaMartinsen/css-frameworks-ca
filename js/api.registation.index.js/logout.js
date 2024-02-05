import { registerUser } from "./api.authorization.js";

function getRegisterUser() {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userData = {
      name: document.getElementById("registerName").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    };

    const validationResult = validateForm(userData);
    if (validationResult !== true) {
      displayErrors(validationResult);
      return;
    }
    try {
      const result = await registerUser(
        `${API_BASE_URL}/social/auth/register`,
        userData
      );

      if (!result.ok) {
        throw new Error("HTTP error" + result.status);
      }

      const json = await result.json();
      console.log("json", json);

      window.location.href = "../profile.html";
      return json;
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error message
    }
  });
}

function validateForm(userData) {
  console.log(userData);
  const nameError = document.getElementById("nameError-register");

  if (checkUserNameRegistration(userData.name)) {
    nameError.style.display = "none";
    return true;
  } else {
    nameError.style.display = "block";
    return "Username may only contain alphanumerics and underscores.";
  }
}

function checkUserNameRegistration(value) {
  const regExt = /^[a-zA-Z0-9_]*$/;
  return value.trim().length > 0 && regExt.test(value);
}

getRegisterUser();
