document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (!response.ok) {
        const responseDdata = await response.json();
        alert(responseDdata.message);

        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      localStorage.setItem("authToken", responseData.token);
      alert(responseData.message);
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
