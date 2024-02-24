import { getProfile } from "./getProfile.js";

export async function getProfileForm() {
  try {
    const profile = await getProfile();

    const currentUserName = document.querySelector("#name");
    const currentUserEmail = document.querySelector("#email");
    const currentUserBanner = document.querySelector("#banner");
    const currentUserAvatar = document.querySelector("#avatar");

    currentUserName.value = profile.name;
    currentUserEmail.value = profile.email;
    currentUserBanner.value = profile.banner;
    currentUserAvatar.value = profile.avatar;
  } catch (error) {
    console.error(error);
  }
}
