import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
  const token = getDecodedAuthToken();
  if (token !== undefined) {
    document.getElementById("fullname").textContent =
      token.firstname + " " + token.lastname;
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
