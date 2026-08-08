const d = document;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userNameRegex = /^[a-zA-Z0-9_-]{4,}$/;
// form inputs
const passwordInputs = d.querySelectorAll(".password-inputs");
const formInputs = d.querySelectorAll("input:not([type='checkbox'])");
const emailInputs = d.querySelectorAll(".email-inputs");
const usernameInput = d.querySelector(".username-input");

// switch btns
const switchBtns = d.querySelectorAll(".switch-btn");

// cards
const card = d.getElementById("main-card");
const registerCard = d.getElementById("register-card");
const loginCard = d.getElementById("login-card");

// login form
const emailLoginForm = d.getElementById("email-login-form");
const passwordLoginForm = d.getElementById("password-login-form");
const loginBtn = d.getElementById("login-btn");
const registerBtn = d.getElementById("register-btn");

// register form inputs
const usernameRegisterForm = d.getElementById("username-register-form");
const emailRegisterForm = d.getElementById("email-register-form");
const passwordRegisterForm = d.getElementById("password-register-form");
const passwordRepeatRegisterForm = d.getElementById(
  "password-repeat-register-form",
);

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

const sweetAlertLogin = (
  title,
  text,
  icon,
  showCancelButton,
  showConfirmButton,
) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "ok",
    cancelButtonText: "ok",

    customClass: {
      popup:
        "!rounded-3xl !bg-linear-to-br !from-emerald-300 !via-green-500 !to-teal-700 !shadow-2xl",

      title: "!text-white !font-inter-bold",

      htmlContainer: "!text-white",

      confirmButton:
        "!text-white !rounded-xl !bg-white/20 !px-6 !py-3 !font-bold !transition",

      cancelButton: "ml-2! !text-white !rounded-xl !bg-red-500 !px-6 !py-3",

      icon: "!text-white",

      closeButton: "!text-white",
    },
    showCancelButton,
    showConfirmButton,
    buttonsStyling: false,
  });
};

const sweetAlertRegister = (
  title,
  text,
  icon,
  showCancelButton,
  showConfirmButton,
) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "ok",
    cancelButtonText: "ok",

    customClass: {
      popup:
        "!rounded-3xl !bg-linear-to-br !from-orange-300 !via-orange-400 !to-amber-700 !shadow-2xl",

      title: "!text-white !font-inter-bold",

      htmlContainer: "!text-white",

      confirmButton:
        "!text-white !rounded-xl !bg-white/20 !px-6 !py-3 !font-bold !transition",

      cancelButton: "!text-white !rounded-xl !bg-orange-700 !px-6 !py-3",

      icon: "!text-white",

      closeButton: "!text-white",
    },
    showCancelButton,
    showConfirmButton,
    buttonsStyling: false,
  });
};

const userIsLogin = () => {
  const hasUser = getItemsLocalStorage("users").some((user) => {
    return (
      user.email === emailLoginForm.value.trim() &&
      user.password === passwordLoginForm.value.trim()
    );
  });

  return hasUser;
};

const getItemsLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const setItemsLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
console.log(getItemsLocalStorage("users"));

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

// Operation Login
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!emailRegex.test(emailLoginForm.value.trim())) {
    sweetAlertLogin(
      "invalid email",
      "Please enter a valid email address",
      "error",
      true,
      false,
    );
    return;
  }
  if (!passwordRegex.test(passwordLoginForm.value.trim())) {
    sweetAlertLogin(
      "invalid password",
      "The password must contain numbers and letters.",
      "error",
      true,
      false,
    );
    return;
  }

  if (userIsLogin()) {
    sweetAlertLogin(
      "welcome",
      "You have been logged in successfully.",
      "success",
      false,
      true,
    );
  } else {
    sweetAlertLogin(
      "unsuccess login",
      "Login failed. Please check your email and password.",
      "error",
      true,
      false,
    );
  }
});

// Operation Register
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!userNameRegex.test(usernameRegisterForm.value.trim())) {
    sweetAlertRegister(
      "invalid userName",
      "Username must be at least 4 characters long.",
      "error",
      true,
      false,
    );
    return;
  }
  if (!emailRegex.test(emailRegisterForm.value.trim())) {
    sweetAlertRegister(
      "invalid email",
      "Please enter a valid email address",
      "error",
      true,
      false,
    );
    return;
  }
  if (!passwordRegex.test(passwordRegisterForm.value.trim())) {
    sweetAlertRegister(
      "invalid password",
      "The password must contain numbers and letters.",
      "error",
      true,
      false,
    );
    return;
  }
  if (
    passwordRegisterForm.value.trim() !==
    passwordRepeatRegisterForm.value.trim()
  ) {
    sweetAlertRegister(
      "Password mismatch",
      "Please check your password.",
      "error",
      true,
      false,
    );
    return;
  }
  const user = {
    username: usernameRegisterForm.value.trim(),
    email: emailRegisterForm.value.trim(),
    password: passwordRegisterForm.value.trim(),
  };
  const usersInfo = getItemsLocalStorage("users");
  usersInfo.push(user);
  setItemsLocalStorage("users", usersInfo);
  sweetAlertRegister(
    "Account created successfully!",
    "Welcome! Your account has been created.",
    "success",
    false,
    true,
  );
});
