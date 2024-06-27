import { isAuthenticated } from "./utils/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  });
  
