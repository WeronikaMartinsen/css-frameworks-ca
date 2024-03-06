import { load } from "../../api/storeToken.js";
import { API_BASE_URL, PROFILES, MEDIA } from "../../api/constants.js";

export async function updateAvatar(imageUrl, authorName) {
  const token = load("token");

  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${authorName}${MEDIA}`;

  try {
    const requestBody = {
      avatar: imageUrl,
    };

    const response = await fetch(updateProfileURL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      console.error("Error updating avatar. Server response:", result);
    }
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
}
