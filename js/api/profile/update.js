import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/profiles";
const method = "put";

export async function updateProfile(profileData) {
  if (!profileData.name) {
    console.error("Update Requires a name!");
    return;
  }

  const updateProfileURL = `${API_SOCIAL_URL}${action}${profileData.name}`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });
  return await response.json();
}
