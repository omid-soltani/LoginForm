const d = document;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userNameRegex = /^[a-zA-Z0-9_-]{4,}$/;
// form inputs
const passwordInputs = d.querySelectorAll(".password-inputs");
const formInputs = d.querySelectorAll("input:not([type='checkbox'])");
const emailInputs = d.querySelectorAll(".email-inputs");
const usernameInput = d.getElementById("username-input");

// switch btns
const switchBtns = d.querySelectorAll(".switch-btn");

// cards
const card = d.getElementById("main-card");
const registerCard = d.getElementById("register-card");
const loginCard = d.getElementById("login-card");
console.log(loginCard);

const inputsValidateByBorder = (inputPassword, passRegex) => {
  if (passRegex.test(inputPassword.value.trim())) {
    inputPassword.classList.remove("border-red-500!");
  } else {
    inputPassword.classList.add("border-red-500!");
    inputPassword.classList.remove("border-green-500!");
  }
};

const switchBtnHandler = (btnAction) => {
  if (btnAction === "registration") {
    card.classList.add("is-flipped");
    d.body.classList.toggle("liner-green");
    d.body.classList.toggle("liner-orange");
  } else {
    d.body.classList.toggle("liner-green");
    d.body.classList.toggle("liner-orange");
    card.classList.remove("is-flipped");
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

switchBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnType = e.currentTarget.dataset.action;
    switchBtnHandler(btnType);
  });
});
