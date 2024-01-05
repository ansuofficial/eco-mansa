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


    async function newStudent() {
      const username = document.getElementById('name').value;
      const password = document.getElementById('matNo').value;
    
      const response = await fetch('/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
    
      if (response.ok) {
       console.log("Success") 
      } else {
        // Display error message
        console.log("error") 

      }
    }
    