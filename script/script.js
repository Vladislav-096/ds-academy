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
