let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPass = document.getElementById("pass");
let forms = document.getElementsByTagName("form");
let btnLogout = document.getElementById("log-out");
let showPasswordBtn = document.getElementById("see-password");

let allInputs = Array.from(document.querySelectorAll(".input"));
let validationRules = [
  {
    regex: /^([a-z]|\s){3,15}$/i,
    valid: false,
  },
  {
    regex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    valid: false,
  },
  {
    regex: /^([a-z]|[A-Z]|[0-9]){3,20}$/,
    valid: false,
  },
];

let usersList = localStorage.user ? JSON.parse(localStorage.user) : [];

forms[0]?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (location.href.endsWith("sign-up.html")) {
    handleSignUp();
  } else {
    handleLogin();
  }
});

function handleSignUp() {
  let successMsg = document.getElementById("success");
  if (
    isEmailUsed() !== false &&
    validationRules.every((rule) => rule.valid === true) &&
    allInputs.every((el) => el.value !== "")
  ) {
    let user = {
      name: inputName.value.toLowerCase().trim(),
      email: inputEmail.value.toLowerCase().trim(),
      pass: inputPass.value.toLowerCase().trim(),
    };
    usersList.push(user);
    localStorage.setItem("user", JSON.stringify(usersList));
    location.href = "./../index.html";
    showSuccess(successMsg, "success", "green");
    clearInputs();
  } else if (isEmailUsed() === false) {
    showSuccess(successMsg, "email already exist", "red");
  } else {
    showSuccess(successMsg, "inputs are required", "red");
  }
}

function showSuccess(element, text, color) {
  element.classList.remove("d-none");
  element.innerHTML = text;
  element.style.color = color;
}

function handleLogin() {
  let matchFound = false;
  for (let i = 0; i < usersList.length; i++) {
    if (
      inputEmail.value.toLowerCase() === usersList[i].email &&
      inputPass.value.toLowerCase() === usersList[i].pass
    ) {
      localStorage.setItem("name", usersList[i].name);
      location.href = "./html-pages/home.html";
      matchFound = true;
      clearInputs();
    }
  }
  if (!matchFound) {
    let errorMsg = document.getElementById("incorrect");
    errorMsg.classList.remove("d-none");
  }
}

function isEmailUsed() {
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email === inputEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function clearInputs() {
  if (inputName) inputName.value = "";
  inputEmail.value = "";
  inputPass.value = "";
}

window.addEventListener("load", () => {
  if (location.href.includes("home.html")) {
    let welcomeMsg = document.getElementById("welcome");
    welcomeMsg.innerHTML += localStorage.getItem("name");
  }
});

btnLogout?.addEventListener("click", () => {
  location.href = "./../index.html";
});

if (allInputs.length <= 2) {
  validationRules.shift();
}

function checkInput(input, rule, index) {
  if (rule.regex.test(input.value)) {
    validationRules[index].valid = true;
    input.nextElementSibling.classList.replace("d-block", "d-none");
  } else if (location.href.endsWith("sign-up.html")) {
    input.nextElementSibling.classList.replace("d-none", "d-block");
  }
}

for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].addEventListener("input", () => {
    checkInput(allInputs[i], validationRules[i], i);
  });
}
