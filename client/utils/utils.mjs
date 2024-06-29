import { jwtDecode } from "jwt-decode";
import { usericon, likeicon, comment, sendicon } from "../icons/icons.js";

export function isAuthenticated() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds

    return decodedToken.exp >= currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

export function getDecodedAuthToken() {
  const token = localStorage.getItem("authToken");
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
  }
}

export async function fetchPosts() {
  try {
    const response = await fetch(`/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function createPost(post, isLiked = null) {
  let postTemplate = "";
  if (isLiked) {
    postTemplate = `
<div id="c222">
        <div id="c222a">
          ${usericon}
          <p>${post.fullname}</p>
        </div>
        <div>
          <p>
            ${post.content}
          </p>
        </div>
        <hr />
        <div id="c222c">
          <style>
            #like-button-${post.post_id} {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 5px;
              border-radius: var(--bd-radius);
              cursor: pointer;
              background: var(--accent);
            }
            #like-button-${post.post_id}:hover {
              background: var(--tint);
              // color: white;
            }
          </style>
          <span id="like-button-${post.post_id}">
            ${likeicon}
            Like
          </span>
          <span id="comment-button-${post.post_id}">
            ${comment}
            Comment
          </span>
        </div>
        <hr />
        <div id="c222b">
          ${usericon}
          <form style="width: 100%; display: flex; align-items: center">
            <input
              style="background-color: #d6f1f5"
              type="text"
              placeholder="Write a comment..."
            />
            ${sendicon}
          </form>
        </div>
      </div>
  `;
  } else {
    postTemplate = `
<div id="c222">
        <div id="c222a">
          ${usericon}
          <p>${post.fullname}</p>
        </div>
        <div>
          <p>
            ${post.content}
          </p>
        </div>
        <hr />
        <div id="c222c">
          <style>
            #like-button-${post.post_id} {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 5px;
              border-radius: var(--bd-radius);
              cursor: pointer;
            }
            #like-button-${post.post_id}:hover {
              background: var(--tint);
              // color: white;
            }
          </style>
          <span id="like-button-${post.post_id}">
            ${likeicon}
            Like
          </span>
          <span id="comment-button-${post.post_id}">
            ${comment}
            Comment
          </span>
        </div>
        <hr />
        <div id="c222b">
          ${usericon}
          <form style="width: 100%; display: flex; align-items: center">
            <input
              style="background-color: #d6f1f5"
              type="text"
              placeholder="Write a comment..."
            />
            ${sendicon}
          </form>
        </div>
      </div>
  `;
  }

  return postTemplate;
}
