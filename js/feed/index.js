import { logout } from "../api/logout.js";

import { displayPosts } from "./displayPosts.js";

import { getNewPost } from "./createPostFrom.js";

logout();
displayPosts();
getNewPost();
