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
  profileButton.addEventListener("click", () => {
    if (logoutContainer.style.display === "none") {
      logoutContainer.style.display = "flex";
    } else {
      logoutContainer.style.display = "none";
    } 
  });
});
