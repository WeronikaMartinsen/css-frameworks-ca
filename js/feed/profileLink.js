import { load } from "../api/storeToken.js";

export function profileLink() {
  const getProfileFromToken = load("profile");
  const user = getProfileFromToken.userName;

  const getProfileLink = document.querySelector("#profile");

  if (getProfileLink) {
    getProfileLink.href = `/profile/index.html?author=${user}`;
  }
}

profileLink();

export function mediaLink() {
  const getProfileFromToken = load("profile");
  const user = getProfileFromToken.userName;
  const media = getProfileFromToken.mediaName;

  const getMediaLink = document.querySelector("#media");

  if (getMediaLink) {
    // Check if media is defined and a valid URL
    const mediaUrl = media && isValidUrl(media) ? media : "";

    getMediaLink.href = `/profile/update.html?author=${user}&media=${mediaUrl}`;
  }
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
