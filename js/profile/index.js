import { toggleAvatarForm } from "./update/toggleAvatar.js";

import { getProfileForm } from "./getProfileForm.js";

import { logout } from "../api/logout.js";

import { displayProfilePosts } from "./displayProfilePosts.js";

import { profileLink, profileLinkMedia } from "../feed/profileLink.js";

import {
  showLoadingIndicator,
  hideLoadingIndicator,
  delay,
} from "../global/functions/loader.js";
import { updateAvatar } from "./update/updateProfile.js";

toggleAvatarForm();
getProfileForm();
logout();
displayProfilePosts();
profileLink();
showLoadingIndicator();
hideLoadingIndicator();
delay();
profileLinkMedia();
updateAvatar();
