function getRegisterUser() {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userData = {
      name: document.getElementById("registerName").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    };
    try {
      const result = await getRegisterUser(
        `${API_BASE_URL}/social/auth/register`,
        userData
      );

      if (result && result.status !== "Bad Request") {
        console.log(result);
        window.location.href = "../html/profile.html";
      } else {
        console.error("Registration failed: ", result.errors);
        // Show error message
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error message
    }
  });
  return userData;
}
