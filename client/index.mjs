import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";
import { usericon, likeicon, comment, sendicon } from "./icons/icons.js";

document.addEventListener("DOMContentLoaded", () => {
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

    const postsContainer = document.getElementById("c222d");
    let posts = '';

    function createPost(fullname, content) {
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

    
    document
      .getElementById("form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        const user_id = token.id;
        const content = document.getElementById("content").value;

        try {
          const response = await fetch("/add-post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, content }),
          });

          if (!response.ok) {
            const responseDdata = await response.json();
            alert(responseDdata.message);

            throw new Error("Network response was not ok");
          }

          const responseData = await response.json();
          if (responseData.success) {
            posts = createPost((token.firstname + ' ' + token.lastname), content) + posts;
            
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
});
