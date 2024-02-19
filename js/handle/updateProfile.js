import { getProfile, updateProfile } from "../api/profile/index.js";

import { load } from "../api/getToken.js";

export async function updateProfileFormListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");
    const button = form.querySelector("button");
    button.disabled = true; // Corrected property name

    const profile = await getProfile(name);

    form.name.value = name;
    form.email.value = email;
    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;
      updateProfile(profile);
    });
  }
}
