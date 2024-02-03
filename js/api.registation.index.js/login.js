import { loginUser } from "./api.authorization";

async function login() {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const name = document.getElementById("loginName").value;

  const user = {
    email: loginEmail,
    password: loginPassword,
  };

  registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
