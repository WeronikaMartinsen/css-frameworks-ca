export function loadingIndicator(isShowing) {
  const loader = document.querySelectorAll(".loader");
  if (isShowing) {
    loader.classList.add("show");
  } else {
    loader.classlist.remove("show");
  }
}
