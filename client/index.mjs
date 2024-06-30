import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";

import { fetchPosts, createPost } from "./utils/utils.mjs";

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
          posts =
            createPost(token.firstname + " " + token.lastname, content) + posts;

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
var isLiked;
function handleLike(post, current_user_id) {

  const likeButton = document.getElementById(`like-button-${post.post_id}`);
  // const likeCount = document.querySelector(`#like-count-${post_id}`);
  isLiked = post.is_liked;
  likeButton.addEventListener("click", async () => {
    if(isLiked){
      isLiked = false;
      likeButton.style.color = 'black';
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
          alert(responseDdata.message);

          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }else {
      isLiked = true;
      likeButton.style.color = 'var(--accent)';
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
          alert(responseDdata.message);

          throw new Error("Network response was not ok");
        }
        

      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  
  const current_user_id = token.id;
  const postsData = await fetchPosts(current_user_id);

  if (postsData !== undefined) {
    postsData.map((post) => {
      console.log('here', post);
      

      posts = createPost(post) + posts;
    });
    postsContainer.innerHTML = posts;
    postsData.map((post) => {
      handleLike(post, current_user_id);
    });
    // document.addEventListener('click')
  }
});
