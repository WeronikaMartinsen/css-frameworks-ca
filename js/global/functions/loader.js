export function showLoadingIndicator() {
  const loadingContainer = document.querySelector(".loaderContainer");
  loadingContainer.style.display = "block";
  console.log("added");
}

export function hideLoadingIndicator() {
  const loadingContainer = document.querySelector(".loaderContainer");
  loadingContainer.style.display = "none";
  console.log("removed");
}
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
