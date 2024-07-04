/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/login/login.mjs":
/*!********************************!*\
  !*** ./client/login/login.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\ndocument\n  .getElementById(\"form\")\n  .addEventListener(\"submit\", async function (event) {\n    event.preventDefault(); // Prevent the form from submitting via the browser's default behavior\n\n    const email = document.getElementById(\"email\").value;\n    const password = document.getElementById(\"password\").value;\n\n    try {\n      const response = await fetch(\"/user/authenticate\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify({ email, password }),\n      });\n\n      if (!response.ok) {\n        const responseDdata = await response.json();\n        alert(responseDdata.message);\n\n        throw new Error(\"Network response was not ok\");\n      }\n\n      const responseData = await response.json();\n      localStorage.setItem(\"authToken\", responseData.token);\n      alert(responseData.message);\n      window.location.href = \"http://localhost:3000/\";\n    } catch (error) {\n      console.error(\"Error submitting form:\", error);\n    }\n  });\n\n\n//# sourceURL=webpack://fbclone/./client/login/login.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/login/login.mjs"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;