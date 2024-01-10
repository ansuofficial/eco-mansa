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


const toggleController = () => {
  newUser.addEventListener("click", () =>
    toFill.classList.toggle("to-fill-form")
  );
  cancel.addEventListener("click", () => toFill.classList.add("to-fill-form"));
};
toggleController();

async function newStudent() {
  const fullname = document.getElementById('name').value;
  const matNo = document.getElementById('matNo').value;
  const contact = document.getElementById('contact').value;
  const major = document.getElementById('major').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const gender = document.getElementById('gender').value;
  const intake = document.getElementById('intake').value;
  const status = document.getElementById('status').value;
    
      const response = await fetch('/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, matNo, contact, major, amount, date, gender, intake ,status}),
      });
    
      if (response.ok) {
       
      } else {
        // Display error message
        console.log("Error");
      }
    }
    
    
    //Chart
  