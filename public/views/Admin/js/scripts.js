/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
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

const valueHandler = () => {
  let user = [];
  create.addEventListener("click", () => {
    user.push(firstName.value);
    user.push(matNumber.value);
    user.push(select.value);
    user.push(address.value);
    user.push(date.value);
    user.push(email.value)
    
    let html = `
                <tr>
                  <td>${firstName.value}</td>
                  <td>${email.value}</td>
                  <td>${address.value}</td>
                  <td>${matNumber.value}</td>
                  <td>${date.value}</td>
                  <td>${select.value}</td>
                </tr>
                <tr>
    `
    tbody.insertAdjacentHTML("afterbegin", html)

  });

  return user;
};

console.log(valueHandler());
