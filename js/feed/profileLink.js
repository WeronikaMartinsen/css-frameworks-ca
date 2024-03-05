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
