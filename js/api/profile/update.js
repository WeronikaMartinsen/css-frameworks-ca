import { API_SOCIAL_URL, API_PROFILES, API_MEDIA } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const method = "put";

export async function updateProfile(profileData) {
  console.log("Profile Data:", profileData);
  if (!profileData.name) {
    console.error("Update requires a name!");
    return;
  }

  const updateProfileURL = `${API_SOCIAL_URL}${API_PROFILES}/${profileData.name}${API_MEDIA}`;
  console.log("Update Profile URL:", updateProfileURL);
  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    console.error(`Request failed with status ${response.status}`);
    return;
  }

  return await response.json();
}
