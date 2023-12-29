const person = [
  {
    name: "Ansu",
    role: "Admin",
    password: 123,
  },
];

const userName = document.querySelector("#username");
const psw = document.querySelector("#password");
const login = document.querySelector("#login");
const err = document.querySelector(".error");

const handleLogin = () => {
  login.addEventListener("click", (e) => {
    e.preventDefault();

    const auth = person.find((user) => {
      user.name == userName.value && user.password == psw.value
        ? (window.location.href = "http://localhost:3030/admin")
        : err.classList.remove(`error`),
        (psw.value = "");
    });
  });
};

handleLogin();
