import { getProfiles } from "./getProfiles.js";

async function fetchProfiles() {
  return await getProfiles(); // Use your getProfiles function
}

export async function displayProfiles() {
  const profilesContainer = document.getElementById("profiles");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  const profiles = await fetchProfiles();

  function createProfileElement(profile) {
    const profileElement = document.createElement("div");
    profileElement.classList.add("profile");

    const avatarElement = document.createElement("img");
    avatarElement.classList.add("rounded-image");
    avatarElement.src = profile.avatar || "/images/avatar.png";
    avatarElement.alt = "Profile Avatar";
    profileElement.appendChild(avatarElement);

    const nameElement = document.createElement("div");
    nameElement.classList.add("profile-name");
    nameElement.textContent = profile.name || "Default Name";
    profileElement.appendChild(nameElement);

    return profileElement;
  }

  function updateButtonsVisibility() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex + 10 >= profiles.length;
  }

  function handlePrevClick() {
    if (currentIndex >= 10) {
      currentIndex -= 10;
      displayProfiles(currentIndex);
      updateButtonsVisibility();
    }
  }

  function handleNextClick() {
    if (currentIndex + 10 < profiles.length) {
      currentIndex += 10;
      displayProfiles(currentIndex);
      updateButtonsVisibility();
    }
  }

  function displayProfiles(startIndex) {
    profilesContainer.innerHTML = ""; // Clear previous content

    for (let i = startIndex; i < startIndex + 10 && i < profiles.length; i++) {
      const profile = profiles[i];
      const profileElement = createProfileElement(profile);
      profilesContainer.appendChild(profileElement);
    }
  }

  // Event listeners for buttons
  prevBtn.addEventListener("click", handlePrevClick);
  nextBtn.addEventListener("click", handleNextClick);

  // Initial setup
  displayProfiles(currentIndex);
  updateButtonsVisibility();
}
