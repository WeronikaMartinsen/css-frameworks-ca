import { getProfileForm } from "./getProfileForm.js";

import { logout } from "../api/logout.js";

import { displayProfilePosts } from "./displayProfilePosts.js";

import { profileLink } from "../feed/profileLink.js";

getProfileForm();
logout();
displayProfilePosts();
profileLink();
