import { load } from "../api/storeToken.js";
import { authorName } from "../api/constants.js";

export function profileLink() {
  const getProfileFromToken = load("profile");
  const user = getProfileFromToken.userName;

  const getProfileLink = document.querySelector("#profile");

  if (getProfileLink) {
    const targetAuthor = authorName || user;

    getProfileLink.href = `/profile/index.html?author=${targetAuthor}`;
  }
}

profileLink();
