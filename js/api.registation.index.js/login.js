function getLoginUser() {
  const loginForm = document.getElementById("registerForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userData = {
      name: document.getElementById("loginName").value,
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };
    try {
      const result = await getLoginUser(
        `${API_BASE_URL}/social/auth/login`,
        userData
      );

      if (result && result.status !== "Bad Request") {
        console.log(result);
        window.location.href = "/html/profile.html";
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
