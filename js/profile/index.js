import { getProfileForm } from "./getProfileForm.js";

import { logout } from "../api/logout.js";

import { displayProfilePosts } from "./displayProfilePosts.js";

import { profileLink } from "../feed/profileLink.js";

import {
  showLoadingIndicator,
  hideLoadingIndicator,
  delay,
} from "../global/functions/loader.js";

getProfileForm();
logout();
displayProfilePosts();
profileLink();
showLoadingIndicator();
hideLoadingIndicator();
delay();
