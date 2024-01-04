window.addEventListener("DOMContentLoaded", (event) => {
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

// Custom JavaScript

const toFill = document.querySelector(".to-fill-form");
const newUser = document.querySelector(".new-user");
const cancel = document.querySelector(".cancel");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const matNumber = document.querySelector("#mat-number");
const email = document.querySelector("#email");
const create = document.querySelector("#create");
const select = document.querySelector("#select");
const address = document.querySelector("#address");
const date = document.querySelector("#date");
const tbody = document.querySelector("#tbody");

console.log(select.value);

const toggleController = () => {
  newUser.addEventListener("click", () =>
    toFill.classList.toggle("to-fill-form")
  );
  cancel.addEventListener("click", () => toFill.classList.add("to-fill-form"));
};
toggleController();
// Initialize user array
let user = [];

const valueHandler = () => {
  create.addEventListener("click", () => {
    // Retrieve existing data from local storage
    let storedData = JSON.parse(localStorage.getItem("user-copy")) || [];

        console.log(user)
    })
}
    valueHandler()

// Frontend JavaScript code

// async function logout() {
//     try {
//       const response = await fetch('/logout', {
//         method: 'POST',
//       });
  
//       if (response.ok) {
//         // Successful logout
//         window.location.href = '/login'; // Redirect to the login page
//       } else {
//         // Display error message
//         const errorMessage = await response.text();
//         console.error('Logout error:', errorMessage);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   }
  
//   // Attach the logout function to the logout button click event
//   document.getElementById('logout-button').addEventListener('click', logout);
  
