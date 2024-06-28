import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";

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
      "post_input"
    ).placeholder = `What's in your mind ${token.firstname}`;

    const postsContainer = document.getElementById("c222d");
    const posts = `
    <div id="c222">
            <div id="c222a">
              <script src="./icons//usericon.js"></script>
              <p>Jonas Gestopa</p>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
                <script src="./icons/likeicon.js"></script>
                Like
              </span>
              <span id="c222c1">
                <script src="./icons/comment.js"></script>
                Comment
              </span>
            </div>
            <hr />
            <div id="c222b">
              <script src="./icons/usericon.js"></script>
              <form style="width: 100%; display: flex; align-items: center">
                <input
                  style="background-color: #d6f1f5"
                  type="text"
                  placeholder="Write a comment..."
                />
                <script src="./icons/sendicon.js"></script>
              </form>
            </div>
          </div>
    `;
    postsContainer.innerHTML = posts;
  }

  const logoutButton = document.getElementById("c121b");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  });

  const profileButton = document.getElementById("c122");
  const logoutContainer = document.getElementById("c121");

  profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (logoutContainer.style.display === "flex") {
      logoutContainer.style.display = "none";
    } else {
      logoutContainer.style.display = "flex";
    }
  });

  // Hide logoutContainer when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !logoutContainer.contains(event.target) &&
      event.target !== profileButton
    ) {
      logoutContainer.style.display = "none";
    }
  });
});
