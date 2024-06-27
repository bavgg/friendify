import { isAuthenticated } from "./utils/utils.mjs";

window.location.href = isAuthenticated() ? "./index.html" : "./login.html";
