/* import { getProfile } from "./getProfile.js";

export async function getProfileForm() {
  try {
    const profile = await getProfile();

    const currentUserName = document.querySelector("#name");
    const currentUserEmail = document.querySelector("#email");
    const currentUserBanner = document.querySelector("#banner");
    const currentUserAvatar = document.querySelector("#avatar");

    currentUserName.innerText = `${profile.name}`;
    currentUserEmail.innerText = `${profile.email}`;
    currentUserBanner.innerText = `${profile.banner}`;
    currentUserAvatar.innerText = `${profile.avatar}`;
  } catch (error) {
    console.error(error);
  }
} */
