import { load } from "../api/storeToken.js";

/**
 * Sets the profile link based on the user's profile data from the stored token.
 * The link is updated to navigate to the user's profile page.
 * @example
 * // Calling the function sets the profile link.
 * profileLink();
 */
export function profileLink() {
  const getProfileFromToken = load("profile");
  const user = getProfileFromToken.userName;

  const getProfileLink = document.querySelector("#profile");

  if (getProfileLink) {
    getProfileLink.href = `/profile/index.html?author=${user}`;
  }
}

profileLink();

/**
 * Sets the profile media link based on the user's profile data from the stored token.
 * The link is updated to navigate to the user's profile update page.
 * @example
 * // Calling the function sets the profile media link.
 * profileLinkMedia();
 */

export function profileLinkMedia() {
  const getProfileFromToken = load("profile");
  const user = getProfileFromToken.userName;

  const getProfileLinkMedia = document.querySelector("#profileMedia");

  if (getProfileLinkMedia) {
    getProfileLinkMedia.href = `/profile/update.html?author=${user}`;
  }
}

profileLinkMedia();
