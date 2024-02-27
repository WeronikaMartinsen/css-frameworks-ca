import { updateProfile } from "./updateProfile.js";
import { authorName } from "../api/constants.js";

export function openFileInput() {
  const avatarInput = document.getElementById("avatar");
  avatarInput.style.display = "block";
}

export async function updateProfileForm() {
  try {
    const avatarInput = document.getElementById("avatar");
    const newAvatar = avatarInput.value;

    const updatedProfile = await updateProfile({
      authorName: authorName,
      avatar: newAvatar,
    });

    const profileImage = document.getElementById("profileImage");

    profileImage.src = updatedProfile.avatar;

    alert("Your profile has been successfully updated!");
  } catch (error) {
    console.error(error);
  }
}
