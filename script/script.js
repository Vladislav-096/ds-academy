const form = document.getElementById("subscription-form");
const submitButton = document.getElementById("btn-submit");
const emailInput = document.getElementById("email-input");
const errorMessageWrapper = document.getElementById("error-message-wrapper");
const errorMarker = document.getElementById("subscription-state-picture-error");
const successMarker = document.getElementById(
  "subscription-state-picture-success"
);
const termsValidation = document.getElementById("subscription-checkbox");
const placeholder = document.getElementById("subscription-input-placeholder");
const dropdownBtn = document.querySelectorAll(".footer__nav-button");
const dropdownMenu = document.querySelectorAll(".footer__nav-list");
const successNotification = document.getElementById(
  "subscription-success-notification"
);
const header = document.getElementById("header");

const validation = () => {
  if (
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(emailInput.value) &&
    termsValidation.checked
  ) {
    errorMessageWrapper.textContent = "";
    errorMarker.classList.remove("state-picture-active");
    successMarker.classList.add("state-picture-active");
    emailInput.classList.add("input-success");
    emailInput.classList.remove("input-error");
    submitButton.classList.add("submit-active");
    submitButton.disabled = false;
  } else {
    if (errorMessageWrapper.textContent === "") {
      errorMessageWrapper.textContent =
        "Formato de email inválido, verifique a ortografia";
    }
    errorMarker.classList.add("state-picture-active");
    successMarker.classList.remove("state-picture-active");
    emailInput.classList.remove("input-success");
    emailInput.classList.add("input-error");
    submitButton.classList.remove("submit-active");
    submitButton.disabled = true;
  }
};

emailInput.addEventListener("focus", (e) => {
  if (e.target.value === "") {
    placeholder.classList.add("input-placeholder-hidden");
  }
});

emailInput.addEventListener("blur", (e) => {
  if (e.target.value === "") {
    placeholder.classList.remove("input-placeholder-hidden");
  }
});

emailInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    placeholder.classList.add("input-placeholder-hidden");
  } else {
    placeholder.classList.remove("input-placeholder-hidden");
  }

  validation();
});

termsValidation.addEventListener("change", () => {
  validation();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

submitButton.addEventListener("click", () => {
  form.classList.add("hide-form");
  successNotification.classList.add("success-notification-show");
});

// dropdown menu
dropdownBtn.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = dropdownMenu[index].classList.contains("show-dropdown");

    dropdownMenu.forEach((dropdown, i) => {
      dropdown.classList.remove("show-dropdown");
      dropdownBtn[i].classList.remove("turn-dropdow-button-arrow");
    });

    // Если текущий дропдаун не активен, открываем его
    if (!isActive) {
      dropdownMenu[index].classList.add("show-dropdown");
      btn.classList.add("turn-dropdow-button-arrow");
    }
  });
});

document.documentElement.addEventListener("click", function () {
  dropdownMenu.forEach((dropdown) => {
    dropdown.classList.remove("show-dropdown");
  });

  dropdownBtn.forEach((btn) => {
    btn.classList.remove("turn-dropdow-button-arrow");
  });
});

// header
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  const isScrollingDown = currentScroll > lastScrollTop;
  const isPastHeaderHeight = currentScroll > header.offsetHeight;

  if (isScrollingDown && isPastHeaderHeight) {
    header.classList.add("header-visible");
  } else {
    header.classList.remove("header-visible");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Mobile or negative scrolling
});
