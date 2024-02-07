import { registerFormListener } from "./handle/register.js";

import { loginFormListener } from "./handle/login.js";

import { createPost } from "./api/post/create.js";

const path = location.pathname;

if (path === "/index.html") {
  loginFormListener();
} else if (path === "/profile/register/index.html") {
  registerFormListener();
}

createPost({
  title: "weronika",
  body: "martinsen",
});
