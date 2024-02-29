import { logout } from "../api/logout.js";

import { displayPosts } from "./displayPosts.js";

import { getNewPost } from "./createPostFrom.js";

import { profileLink } from "./profileLink.js";

import { getProfiles } from "../profiles/getProfiles.js";

logout();
displayPosts();
getNewPost();
profileLink();
getProfiles();
