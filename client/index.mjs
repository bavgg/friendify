import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
  const token = getDecodedAuthToken();
  if(token !== undefined) {
    (document.getElementById('fullname')).textContent = token.firstname + ' ' + token.lastname;
  }

  const logoutButton = document.getElementById('c121b');

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.href = "/";
  });
});
