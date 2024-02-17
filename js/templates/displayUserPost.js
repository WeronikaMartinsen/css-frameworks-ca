import { getUserPost } from "../api/profile/getUserPost.js";
import { authorName } from "../api/constants.js";

export async function displayUserPost() {
  console.log("displayUserPost called");
  try {
    const posts = await getUserPost();

    const userPost = new Set();
    const getPost = document.getElementById("userPost");

    posts.forEach((post) => {
      if (post.title && post.body && post.media) {
        const postContent = `${post.title}${post.body}`;
        if (!userPost.has(postContent)) {
          userPost.add(postContent);

          getPost.append(
            postCard(
              post.media,
              post.title,
              authorName,
              post.created,
              post.body,
              post.id
            )
          );

          const getDeleteBtn = document.getElementById(`${post.id}`);
          if (getDeleteBtn) {
            getDeleteBtn.addEventListener("click", () => {
              removePost(post.id);
              userFeedback(`Post deleted!`);
            });
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}
