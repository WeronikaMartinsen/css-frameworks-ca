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

export function profileLinkMedia() {
  const getProfileFromToken = load("profile");
  const user = getProfileFromToken.userName;

  const getProfileLinkMedia = document.querySelector("#profileMedia");

  if (getProfileLinkMedia) {
    getProfileLinkMedia.href = `/profile/update.html?author=${user}`;
  }
}

profileLinkMedia();
