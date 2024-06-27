import { isAuthenticated, getDecodedAuthToken } from "./utils/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
  const token = getDecodedAuthToken();
  if(token !== undefined) console.log(token);
  
  (document.getElementById('fullname')).textContent = token.firstname + ' ' + token.lastname;
});
