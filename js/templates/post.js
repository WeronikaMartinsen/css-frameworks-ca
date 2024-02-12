export function postTemplateA(postData) {
  return `<div class="post" id=${postData.id}>${postData.title}</div>`;
}

// Function to create a post element using template B
export function postTemplateB(postData) {
  const post = document.createElement("div");
  post.classList.add("post");
  const titlePost = document.createElement("h5");
  titlePost.innerHTML = postData.title;
  titlePost.classList.add("post-title");
  const bodyPost = document.createElement("span");
  bodyPost.innerHTML = postData.body;
  post.append(titlePost);
  post.append(bodyPost);

  if (postData.media) {
    const imgContainer = document.createElement("imgContainer");
    imgContainer.classList.add("imgContainer");
    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    img.classList.add("post-image");
    post.append(imgContainer);
    imgContainer.append(img);
  }
  return post;
}

// Function to render a single post template B into a parent element
export function renderPostTemplate(postData, parent) {
  parent.append(postTemplateB(postData));
}

export function renderPostTemplates(postDataList, parent) {
  parent.append(...postDataList.map(postTemplateB));
}
