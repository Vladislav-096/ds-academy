import { ChangeEvent, useRef, useState } from "react";
import { sectionsSubscription } from "../Main/Main";
import "./subscriptionSection.scss";

interface SubscriptionSection {
  subscription?: sectionsSubscription;
}

export const SubscriptionSection = ({ subscription }: SubscriptionSection) => {
  const [inputText, setInputText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTextValid, setIsTextValid] = useState<boolean>(false);
  const [isMarkChecked, setIsMarkChecked] = useState<boolean>(false);
  const [isDataSubmitted, setIsDataSubmitter] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInputText(value);

    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      setErrorMessage("");
      setIsTextValid(true);
    } else {
      setErrorMessage("Formato de email inválido, verifique a ortografia");
      setIsTextValid(false);
    }
  };

  const handleClick = () => {
    setIsMarkChecked((prev) => !prev);
  };

  const handleSubmit = () => {
    setIsDataSubmitter(true);
  };

  function agreementText(text?: string) {
    const textArray = text?.split(" ");
    const firstPart = textArray?.splice(0, 8).join(" ");
    const secondPart = textArray?.splice(0, 3).join(" ");
    const thirdPart = textArray?.splice(0, 3).join(" ");
    const fourthPart = textArray?.splice(0).join(" ");

    return (
      <span className="subscription__checkbox-descr">
        {firstPart}
        <a className="subscription__terms-link" href="#">
          {secondPart}
        </a>
        {thirdPart}
        <a className="subscription__terms-link" href="#">
          {fourthPart}
        </a>
      </span>
    );
  }

  // const validation = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (
  //     /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(event.target.value) &&
  //     checkboxRef.current &&
  //     checkboxRef.current.checked
  //   ) {
  //     errorMessageWrapper.textContent = "";
  //     errorMarker.classList.remove("state-picture-active");
  //     successMarker.classList.add("state-picture-active");
  //     emailInput.classList.add("input-success");
  //     emailInput.classList.remove("input-error");
  //     submitButton.classList.add("submit-active");
  //     submitButton.disabled = false;
  //   } else {
  //     if (errorMessageWrapper.textContent === "") {
  //       errorMessageWrapper.textContent =
  //         "Formato de email inválido, verifique a ortografia";
  //     }
  //     errorMarker.classList.add("state-picture-active");
  //     successMarker.classList.remove("state-picture-active");
  //     emailInput.classList.remove("input-success");
  //     emailInput.classList.add("input-error");
  //     submitButton.classList.remove("submit-active");
  //     submitButton.disabled = true;
  //   }
  // };

  return (
    <section className="section-subscription">
      <div className="container">
        <div className="subscription">
          <picture className="line-bg-picture line-bg-seventh-picture">
            <img
              className="line-bg-image"
              src="./src/assets/line-bg-7.svg"
              alt=""
            />
          </picture>
          <div className="subscription__descr-block">
            <picture className="line-bg-picture line-bg-seventh-picture">
              <source
                media="(max-width: 992px)"
                srcSet="./src/assets/line-bg-7.svg"
              />
              <img
                className="line-bg-image"
                src="./src/assets/line-bg-7.svg"
                alt=""
              />
            </picture>
            <div className="subscription__descr-content">
              <h3 className="subscription__heading">{subscription?.title}</h3>
              <p className="subscription__descr">{subscription?.text}</p>
              {isDataSubmitted ? (
                <div
                  // id="subscription-success-notification"
                  className="subscription__success-notification"
                >
                  <p>Fantástico! Espera La primera carta</p>
                  <picture className="subscription__success-notification-picture">
                    <img
                      className="subscription__success-notification-img"
                      src="/src/assets/email-success-sticker.svg"
                      alt="Email notification sticker"
                    />
                  </picture>
                </div>
              ) : (
                <form id="subscription-form" className="subscription__form">
                  <div className="subscription__form-input-submin-wrapper">
                    <div className="subscription__email-input-wrapper">
                      <div className="subscription__input-wrapper">
                        <input
                          onChange={handleChange}
                          value={inputText}
                          // id="email-input"
                          name="email"
                          required
                          className={
                            isTextValid && isMarkChecked
                              ? "subscription__input input-success"
                              : "subscription__input input-error"
                          }
                        />
                        {!inputText && (
                          <span
                            // id="subscription-input-placeholder"
                            className="subscription__input-placeholder"
                          >
                            {subscription?.["email-placeholder"]}
                          </span>
                        )}

                        <picture
                          // id="subscription-state-picture-error"
                          className={
                            isTextValid && isMarkChecked
                              ? "subscription__state-picture"
                              : "subscription__state-picture state-picture-active"
                          }
                        >
                          <img
                            src="./src/assets/error.svg"
                            alt="Error marker image"
                            className="subscription__state-img"
                          />
                        </picture>
                        <picture
                          // id="subscription-state-picture-success"
                          className={
                            isTextValid && isMarkChecked
                              ? "subscription__state-picture state-picture-active"
                              : "subscription__state-picture"
                          }
                        >
                          <img
                            src="./src/assets/correct.svg"
                            alt="Success marker image"
                            className="subscription__state-img"
                          />
                        </picture>
                      </div>
                      <p className="error-message">{errorMessage}</p>
                    </div>
                    <button
                      // id="btn-submit"
                      onClick={handleSubmit}
                      type="button"
                      className={
                        isTextValid && isMarkChecked
                          ? "btn-reset subscription__form-submit submit-active"
                          : "btn-reset subscription__form-submit"
                      }
                      disabled={isTextValid && isMarkChecked ? false : true}
                    >
                      {subscription?.["submit-text"]}
                    </button>
                  </div>
                  <label className="subscription__checkbox-wrapper">
                    <input
                      onClick={handleClick}
                      className="subscription__checkbox"
                      type="checkbox"
                      name="terms"
                      required
                    />
                    {agreementText(subscription?.["agreement-text"])}
                  </label>
                </form>
              )}
            </div>
          </div>
          <picture className="subscription__picture">
            <source
              media="(max-width: 577px)"
              srcSet="./src/assets/email-320-resolution.png"
            />
            <source
              media="(max-width: 992px)"
              srcSet="./src/assets/email-768-resolution.png"
            />
            <img
              src="./src/assets/email.png"
              alt="Email picture"
              className="subscription__img"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
