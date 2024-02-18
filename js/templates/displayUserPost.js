/* import { getUserPost } from "../api/profile/getUserPost.js";
import { authorName } from "../api/constants.js";
import { renderPostTemplates } from "../templates/index.js";

export async function displayUserPost() {
  try {
    console.log("Fetching user posts...");
    const posts = await getUserPost();
    console.log("User posts:", posts);

    // Filter posts based on the author's name
    const userPosts = posts.filter((post) => post.author === authorName);
    console.log("User posts by author:", userPosts);

    const getPost = document.getElementById("userPost");

    // Use the existing logic to render the filtered user posts
    renderPostTemplates(userPosts, getPost);
    console.log("User posts rendered successfully.");
  } catch (error) {
    console.error("Error fetching or rendering user posts:", error);
  }
}
 */
