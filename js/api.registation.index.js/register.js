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
      const result = await getRegisterUser(
        `${API_BASE_URL}/social/auth/register`,
        userData
      );

      if (!response.ok) {
        throw new Error("HTTP error" + response.status);
      }

      const json = await response.json();

      console.log("json", json);

      window.location.href = "../profile.html";

      return json;
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error message
    }
  });
  return userData;
}

function validateForm(userData) {
  const nameError = document.getElementById("nameError-register");
  const nameErrorDuplicate = document.getElementById(
    "nameErrorDuplicate-register"
  );

  if (checkUserNameRegistration(userData.name)) {
    nameError.classList.add("hidden");
    return true;
  } else {
    nameError.classList.remove("hidden");
    return "Username may only contain alphanumerics and underscores.";
  }
}

function checkUserNameRegistration(value) {
  const regExt = /^[a-zA-Z0-9_]*$/;
  return value.trim().length > 0 && regExt.test(value);
}
