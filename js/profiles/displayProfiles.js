import { getProfiles } from "./getProfiles.js";

async function fetchProfiles() {
  return await getProfiles();
}

export async function displayProfiles() {
  const profilesContainer = document.getElementById("profiles");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const profiles = await fetchProfiles();

  const urlParams = new URLSearchParams(window.location.search);
  const authorName = urlParams.get("author");

  function createProfileElement(profile) {
    const profileElement = document.createElement("div");
    profileElement.classList.add("profile");

    const avatarElement = document.createElement("img");
    avatarElement.classList.add("rounded-image");
    avatarElement.src = profile.avatar || "/images/avatar.png";
    avatarElement.alt = "Profile Avatar";

    avatarElement.href = getProfileLink(profile);

    avatarElement.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Profile name clicked:", profile.name);
      window.location.href = getProfileLink(profile);
    });

    profileElement.appendChild(avatarElement);

    const nameElement = document.createElement("a");
    nameElement.classList.add("profile-name");
    nameElement.textContent = profile.name || "Default Name";

    nameElement.href = getProfileLink(profile);

    nameElement.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Profile name clicked:", profile.name);
      window.location.href = getProfileLink(profile);
    });

    profileElement.appendChild(nameElement);

    return profileElement;
  }

  function getProfileLink(profile) {
    return "/profile/index.html?author=" + profile.name;
  }

  function updateButtonsVisibility() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex + getDisplayCount() >= profiles.length;
  }

  function handlePrevClick() {
    // Calculate the new currentIndex for the previous page
    const newCurrentIndex = currentIndex - getDisplayCount();

    // Make sure the new currentIndex is not less than 0
    currentIndex = Math.max(0, newCurrentIndex);

    // Display profiles and update buttons visibility
    displayProfiles(currentIndex);
    updateButtonsVisibility();
  }

  function handleNextClick() {
    // Calculate the new currentIndex for the next page
    const newCurrentIndex = currentIndex + getDisplayCount();

    // Make sure the new currentIndex is within the valid range
    currentIndex = Math.min(newCurrentIndex, profiles.length - 1);

    // Display profiles and update buttons visibility
    displayProfiles(currentIndex);
    updateButtonsVisibility();
  }

  function displayProfiles(startIndex) {
    profilesContainer.innerHTML = ""; // Clear previous content

    const displayCount = getDisplayCount();

    for (
      let i = startIndex;
      i < startIndex + displayCount && i < profiles.length;
      i++
    ) {
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

  // Handle window resize to adjust the display count
  window.addEventListener("resize", () => {
    displayProfiles(currentIndex);
    updateButtonsVisibility();
  });

  // Function to get the display count based on screen width
  function getDisplayCount() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 400) {
      return 2;
    } else if (screenWidth < 500) {
      return 3;
    } else if (screenWidth < 600) {
      return 4;
    } else if (screenWidth < 700) {
      return 5;
    } else if (screenWidth < 992) {
      return 6; // Display 5 profiles for medium screens
    } else {
      return 7; // Display 7 profiles for large screens and above
    }
  }
}
