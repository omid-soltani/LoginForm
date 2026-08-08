const d = document;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userNameRegex = /^[a-zA-Z0-9_-]{4,}$/;

const passwordInputs = d.querySelectorAll(".password-inputs");
const formInputs = d.querySelectorAll("input:not([type='checkbox'])");
const emailInputs = d.querySelectorAll(".email-inputs");
const usernameInput = d.getElementById("username-input");

const inputsValidateByBorder = (inputPassword, passRegex) => {
  if (passRegex.test(inputPassword.value.trim())) {
    inputPassword.classList.remove("border-red-500!");
  } else {
    inputPassword.classList.add("border-red-500!");
    inputPassword.classList.remove("border-green-500!");
  }
};

passwordInputs.forEach((passInput) => {
  passInput.addEventListener("input", () => {
    inputsValidateByBorder(passInput, passwordRegex);
  });
});

emailInputs.forEach((emailInput) => {
  emailInput.addEventListener("input", () => {
    inputsValidateByBorder(emailInput, emailRegex);
  });
});

usernameInput.addEventListener("input", () => {
  inputsValidateByBorder(usernameInput, userNameRegex);
});
