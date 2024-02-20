import { getPosts } from "./getPosts.js";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const postsContainer = document.querySelector("#posts");

    posts.forEach((post) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const titleElement = document.createElement("h5");
      titleElement.classList.add("card-title");
      titleElement.textContent = post.title;

      const cardBody = document.createElement("p");
      cardBody.classList.add("card-body");
      cardBody.textContent = post.body;

      const mediaElement = document.createElement("img");
      mediaElement.classList.add("media");
      mediaElement.src = post.media;
      mediaElement.alt = post.title;

      const authorElement = document.createElement("span");
      authorElement.classList.add("author");
      authorElement.textContent = "Author: " + post.author;

      // Append card body to card
      card.append(titleElement);
      card.append(cardBody);
      card.append(mediaElement);

      // Append card to posts container
      postsContainer.append(card);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
