import { registerFormListener } from "./handle/register.js";

import { loginFormListener } from "./handle/login.js";

const path = location.pathname;

if (path === "/index.html") {
  loginFormListener();
} else if (path === "/profile/register/index.html") {
  registerFormListener();
}
