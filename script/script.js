const form = document.getElementById("subscription-form");
const submitButton = document.getElementById("btn-submit");
const emainInput = document.getElementById("email-input");
const errorMessageWrapper = document.getElementById("error-message-wrapper");
const errorMarker = document.getElementById("subscription-state-picture-error");
const successMarker = document.getElementById(
  "subscription-state-picture-success"
);
const termsValidation = document.getElementById("subscription-checkbox");
const placeholder = document.getElementById("subscription-input-placeholder");
const dropdownBtn = document.querySelectorAll(".footer__nav-button");
const dropdownMenu = document.querySelectorAll(".footer__nav-list");

// form validation
const createErrorMessage = () => {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");

  return errorMessage;
};

emainInput.addEventListener("focus", (e) => {
  if (e.target.value === "") {
    placeholder.classList.add("input-placeholder-hedden");
  }
});

emainInput.addEventListener("blur", (e) => {
  if (e.target.value === "") {
    placeholder.classList.remove("input-placeholder-hedden");
  }
});

emainInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    placeholder.classList.add("input-placeholder-hedden");
  } else {
    placeholder.classList.remove("input-placeholder-hedden");
  }

  errorMessageWrapper.innerHTML = "";
  errorMarker.classList.remove("state-picture-active");
  successMarker.classList.remove("state-picture-active");
  emainInput.classList.remove("input-success");
  emainInput.classList.remove("input-error");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

submitButton.addEventListener("click", (e) => {
  errorMessageWrapper.innerHTML = "";

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(emainInput.value) ||
    !termsValidation.checked
  ) {
    const errorText = createErrorMessage();
    errorText.textContent = "Formato de email inválido, verifique a ortografia";
    errorMessageWrapper.append(errorText);
    successMarker.classList.remove("state-picture-active");
    errorMarker.classList.add("state-picture-active");
    emainInput.classList.remove("input-success");
    emainInput.classList.add("input-error");
    return;
  }

  errorMarker.classList.remove("state-picture-active");
  successMarker.classList.add("state-picture-active");
  emainInput.classList.add("input-success");
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
