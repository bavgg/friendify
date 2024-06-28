import { jwtDecode } from "jwt-decode";
import { usericon, likeicon, comment, sendicon } from "../icons/icons.js";

export function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return false;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // current time in seconds
  
      return decodedToken.exp >= currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

export function getDecodedAuthToken() {
  const token = localStorage.getItem('authToken');
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Invalid token:', error);
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
    console.error('Error fetching data:', error);

  }
}

export function createPost(fullname, content) {
  const postTemplate = `
<div id="c222">
        <div id="c222a">
          ${usericon}
          <p>${fullname}</p>
        </div>
        <div>
          <p>
            ${content}
          </p>
        </div>
        <hr />
        <div id="c222c">
          <style>
            #c222c1 {
              display: flex;
              align-items: center;
              gap: 6px;
            }
          </style>
          <span id="c222c1">
            ${likeicon}
            Like
          </span>
          <span id="c222c1">
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

  return postTemplate;
}