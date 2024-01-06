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
const phone = document.querySelector("#phone");
const create = document.querySelector("#create");
const select = document.querySelector("#select");
const major = document.querySelector("#address");
const date = document.querySelector("#date");
const tbody = document.querySelector("#tbody");
const male = document.querySelector("#male");
console.log(male.value)


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


    // Add to students
      const submitButton = document.getElementById('submitButton');
      const myForm = document.getElementById('myForm');

      if (submitButton && myForm) {
          submitButton.addEventListener('click', async () => {
              try {
                  const formData = new FormData(myForm);
                  const formDataObject = {};
                  formData.forEach((value, key) => {
                      formDataObject[key] = value;
                  });

                  await submitDataToApi('/your-api-endpoint', formDataObject);
              } catch (error) {
                  console.error('Error submitting data:', error);
              }
          });
      }


  async function submitDataToApi(apiEndpoint, data) {
      try {
          const response = await fetch(apiEndpoint, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('Data submitted successfully:', responseData);
      } catch (error) {
          throw new Error(`Error submitting data: ${error.message}`);
      }
  }