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

    if (firstName.value.length > 0 && matNumber.value.length > 0 && address.value.length > 0 && date.value.length > 0 && email.value.length > 0) {
      // Add the new user data to the user array
      user.push({
        firstName: firstName.value,
        matNumber: matNumber.value,
        select: select.value,
        address: address.value,
        date: date.value,
        email: email.value
      });

      // Push the user data to the stored data
      storedData.push(...user);

      // Store the updated data back to local storage
      localStorage.setItem("user-copy", JSON.stringify(storedData));

      let html = `
        <tr class="table-data">
          <td>${firstName.value}</td>
          <td>${email.value}</td>
          <td>${address.value}</td>
          <td>${matNumber.value}</td>
          <td>${date.value}</td>
          <td>${select.value}</td>
        </tr>
        <tr>
      `;
      tbody.insertAdjacentHTML("afterbegin", html);

      // Clear the user array after storing the data
      user = [];

      firstName.value = "";
      matNumber.value = "";
      address.value = "";
      date.value = "";
      email.value = "";
    } else {
      alert("Please fill all inputs");
    }
  });
};

// Call the function to set up the event listener
valueHandler();
