import { getProfiles } from "./getProfiles";

export async function getProfilesForm() {
  try {
    const profile = await getProfiles();

    const profileName = document.querySelector("#profileName");
    const profileAvatar = document.querySelector("#profileAvatar");

    profileName.value = profile.name;
    profileAvatar.value = profile.avatar;
  } catch (error) {
    console.error(error);
  }
}
