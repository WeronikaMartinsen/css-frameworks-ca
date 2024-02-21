import { getPosts } from "./get.js";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const postsContainer = document.querySelector("#posts");

    posts.forEach((post) => {
      const card = document.createElement("a");
      card.classList.add("singlePost");
      card.href = "/feed/singlePost.html?id=" + post.id;
      card.addEventListener("click", () => {
        window.location.href = card.href;
      });

      const titleElement = document.createElement("h5");
      titleElement.classList.add("card-title");
      titleElement.textContent = post.title;

      const cardBody = document.createElement("p");
      cardBody.classList.add("card-body");
      cardBody.textContent = post.body;

      const mediaElement = document.createElement("img");
      mediaElement.classList.add("post-image");

      // Check if post.media exists, if yes, set src to post.media; otherwise, set it to the default source
      mediaElement.src = post.media
        ? post.media
        : "https://picsum.photos/id/18/2500/1667";
      mediaElement.alt = post.title;
      mediaElement.classList.add("rounded-4");

      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("w-100");

      const authorElement = document.createElement("a");
      authorElement.classList.add("author");
      authorElement.textContent = post.author.name;
      authorElement.href = "/profile.index.html?author=" + post.author.name;

      const postID = document.createElement("span");
      postID.classList.add("post-id");
      postID.textContent = post.id;

      const date = document.createElement("span");
      let postDate = new Date(post.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      date.innerText = postDate;

      mediaContainer.append(mediaElement);
      // Append card body to card
      card.append(titleElement);
      card.append(cardBody);
      card.append(mediaContainer);
      card.append(authorElement);
      card.append(postID);
      card.append(date);

      // Append card to posts container
      postsContainer.append(card);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
