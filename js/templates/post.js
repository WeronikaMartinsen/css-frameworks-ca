import { load } from "../api/getToken.js";

const currentUser = load("profile");

console.log("CurrentUser:", currentUser);

export function postTemplateB(postData, currentUser) {
  const singlePost = document.createElement("div");
  singlePost.classList.add("singlePost");

  singlePost.id = `post-${postData.id}`;

  const titlePost = document.createElement("h5");
  titlePost.innerHTML = postData.title;
  titlePost.classList.add("post-title");
  const bodyPost = document.createElement("span");
  bodyPost.innerHTML = postData.body;
  singlePost.append(titlePost);
  singlePost.append(bodyPost);

  singlePost.addEventListener("click", function (event) {
    event.preventDefault();

    // Redirect first
    window.location.href = `/feed/singlePost.html?id=${postData.id}&title=${postData.title}`;
  });

  if (postData.media) {
    const imgContainer = document.createElement("imgContainer");
    imgContainer.classList.add("imgContainer");
    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    img.classList.add("post-image");
    singlePost.append(imgContainer);
    imgContainer.append(img);
  }

  return singlePost;
}

// Function to render a single post template B into a parent element
export function renderPostTemplate(postData, parent) {
  parent.append(postTemplateB(postData));
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplateB));
}
