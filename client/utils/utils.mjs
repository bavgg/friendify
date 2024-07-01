import { jwtDecode } from "jwt-decode";
import { usericon, likeicon, liked_icon, comment, sendicon, likeicon_small } from "../icons/icons.js";

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

export async function fetchPosts(user_id) {
  try {
    const response = await fetch(`/posts?user_id=${user_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export function LikeCount(small_likeicon, like_count) {
  let like_many = '';
  if(like_count > 1) like_many = 's';

  return like_count > 0 ? `
    ${small_likeicon} ${like_count} like${like_many}
  ` : '';
}

function LikeIcon(isLiked, liked_icon, like_icon) {
  if(isLiked) {
    return liked_icon;
  }else {
    return like_icon;
  }
}
export function Post(post) {
  let style = "";
  if (post.is_liked) {
    style = `
      <style>
        #like-button-${post.post_id} {
          color: var(--accent);
        }
      </style>
    `;
  }
  const postTemplate = `
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
      #like-count-${post.post_id} {
        display: flex;
        gap: 5px;
        align-items: center;
      }
    </style>
    <div id="c222">
      <div id="c222a">
        ${usericon}
        <p>${post.fullname}</p>
      </div>
      <div>
        <p>
          ${post.content}
        </p>
        <p id="like-count-${post.post_id}">
          ${LikeCount(likeicon_small, post.like_count, post.is_liked)}
        </p>
      </div>
      <hr />
      <div id="c222c">
        <span id="like-button-${post.post_id}">
          ${LikeIcon(post.is_liked, liked_icon, likeicon)}
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
  return style +  postTemplate;
}
