import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";

import { fetchPosts, Post, LikeCount } from "./utils/utils.mjs";
import { likeicon_small } from "./icons/icons.js";

const postsContainer = document.getElementById("c222d");
let posts = "";

if (!isAuthenticated()) {
  window.location.href = "/login";
}

const token = getDecodedAuthToken();
if (token !== undefined) {
  document.getElementById("fullname1").textContent =
    token.firstname + " " + token.lastname;
  document.getElementById("fullname2").textContent =
    token.firstname + " " + token.lastname;
  document.getElementById(
    "content"
  ).placeholder = `What's in your mind ${token.firstname}`;

  document
    .getElementById("form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const current_user_id = token.id;
      const content = document.getElementById("content").value;

      try {
        const response = await fetch("/add-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current_user_id, content }),
        });

        if (!response.ok) {
          const responseDdata = await response.json();
          alert(responseDdata.message);

          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        if (responseData.success) {
          posts = Post(responseData.post) + posts;

          postsContainer.innerHTML = posts;
        }
        // window.location.href = "http://localhost:3000/";
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    });
}

document.getElementById("c121b").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "/";
});

const documentProfileButton = document.getElementById("c122");
const documentLogoutContainer = document.getElementById("c121");

documentProfileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (documentLogoutContainer.style.display === "flex") {
    documentLogoutContainer.style.display = "none";
  } else {
    documentLogoutContainer.style.display = "flex";
  }
});

// Hide documentLogoutContainer when clicking outside
document.addEventListener("click", (event) => {
  if (
    !documentLogoutContainer.contains(event.target) &&
    event.target !== documentProfileButton
  ) {
    documentLogoutContainer.style.display = "none";
  }
});

function handleLike(post, current_user_id) {
  console.log(post);
  let isLiked = post.is_liked;
  let likeCount = parseInt(post.like_count);
  document.getElementById(`like-count-${post.post_id}`).innerHTML = LikeCount(
    likeicon_small,
    parseInt(post.like_count)
  );
  const likeButton = document.getElementById(`like-button-${post.post_id}`);

  likeButton.addEventListener("click", async () => {
    if (isLiked) {
      document.querySelector(`#like-${post.post_id} #primary`).style.stroke =
          "black";
      document.getElementById(`like-count-${post.post_id}`).innerHTML =
        LikeCount(likeicon_small, (likeCount = likeCount - 1));
      isLiked = false;
      likeButton.style.color = "black";
      try {
        const response = await fetch("/remove-like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current_user_id, post_id: post.post_id }),
        });

        if (!response.ok) {
          const responseDdata = await response.json();
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      isLiked = true;
      document.querySelector(`#like-${post.post_id} #primary`).style.stroke =
          "var(--accent)";
      document.getElementById(`like-count-${post.post_id}`).innerHTML =
        LikeCount(likeicon_small, (likeCount = likeCount + 1));
      likeButton.style.color = "var(--accent)";
      try {
        const response = await fetch("/add-like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current_user_id, post_id: post.post_id }),
        });

        if (!response.ok) {
          const responseDdata = await response.json();
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  });
}

function fillLike(post_id) {
  document.getElementById(`like-${post_id}`).setAttribute("fill", "red");
}
document.addEventListener("DOMContentLoaded", async () => {
  const current_user_id = token.id;
  const postsData = await fetchPosts(current_user_id);

  if (postsData !== undefined) {
    postsData.map((post) => {
      posts = Post(post) + posts;
    });
    postsContainer.innerHTML = posts;
    postsData.map((post) => {
      if (post.is_liked) {
        document.querySelector(`#like-${post.post_id} #primary`).style.stroke =
          "var(--accent)";
      }

      handleLike(post, current_user_id);
    });
  }
});
