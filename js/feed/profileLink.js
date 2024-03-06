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
    getMediaLink.href = `/profile/update.html?author=${user}&media=${media}`;
  }
}

mediaLink();
