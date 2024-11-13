import { ChangeEvent, useRef, useState } from "react";
import { sectionsSubscription } from "../Main/Main";
import "./subscriptionSection.scss";
import { postData } from "../../api/PostData";
import { RunningLine } from "../RunningLine/RunningLine";

interface SubscriptionSection {
  subscription?: sectionsSubscription;
}

export const SubscriptionSection = ({ subscription }: SubscriptionSection) => {
  const [inputText, setInputText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTextValid, setIsTextValid] = useState<string>("default");
  const [isMarkChecked, setIsMarkChecked] = useState<string>("default");
  const [isDataSubmitted, setIsDataSubmitted] = useState<boolean>(false);
  const marqueeBackgroundColor = subscription?.ticker.color;
  const RunningLineText = subscription?.ticker.text;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputText(value);

    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      setErrorMessage("");
      setIsTextValid("valid");
    } else {
      setErrorMessage("Formato de email inválido, verifique a ortografia");
      setIsTextValid("invalid");
      setIsMarkChecked("invalid");
    }
  };

  const handleClick = () => {
    if (isMarkChecked === "default" || isMarkChecked === "invalid") {
      setIsMarkChecked("valid");
    } else {
      setIsMarkChecked("invalid");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDataSubmitted(true);

    try {
      const res = await postData({ mail: inputText });
      console.log("Form submitted successfully:", res);
    } catch (error) {
      setErrorMessage(`Failed to submit form. Please try again. ${error}`);
      console.error("Error submitting form:", error);
    }
  };

  function agreementText(text?: string): JSX.Element {
    const textArray = text?.split(" ");
    const firstPart = textArray?.splice(0, 8).join(" ") + " ";
    const secondPart = textArray?.splice(0, 3).join(" ") + " ";
    const thirdPart = textArray?.splice(0, 3).join(" ") + " ";
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

  return (
    <section className="section-subscription">
      <RunningLine
        amountOfwords={2}
        backgroundColor={marqueeBackgroundColor || ""}
        text={RunningLineText || ""}
        elementClass={"discount-marquee"}
        separatorColor={"white"}
      />
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
                <div className="subscription__success-notification">
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
                <form onSubmit={handleSubmit} className="subscription__form">
                  <div className="subscription__form-input-submin-wrapper">
                    <div className="subscription__email-input-wrapper">
                      <div className="subscription__input-wrapper">
                        <input
                          onChange={handleChange}
                          value={inputText}
                          name="email"
                          required
                          className={`subscription__input ${
                            isTextValid === "valid" && isMarkChecked === "valid"
                              ? "input-success"
                              : isTextValid === "default"
                              ? ""
                              : "input-error"
                          }`}
                        />
                        {!inputText && (
                          <span className="subscription__input-placeholder">
                            {subscription?.["email-placeholder"]}
                          </span>
                        )}

                        {isTextValid === "valid" &&
                          isMarkChecked === "valid" && (
                            <picture className="subscription__state-picture">
                              <img
                                src="./src/assets/correct.svg"
                                alt="Success marker image"
                                className="subscription__state-img"
                              />
                            </picture>
                          )}

                        {(isTextValid === "invalid" ||
                          isMarkChecked === "invalid") && (
                          <picture className="subscription__state-picture">
                            <img
                              src="./src/assets/error.svg"
                              alt="Error marker image"
                              className="subscription__state-img"
                            />
                          </picture>
                        )}
                      </div>
                      <p className="error-message">{errorMessage}</p>
                    </div>
                    <button
                      type="submit"
                      className={`btn-reset subscription__form-submit ${
                        isTextValid === "valid" && isMarkChecked === "valid"
                          ? "submit-active"
                          : ""
                      }`}
                      disabled={
                        isTextValid === "valid" && isMarkChecked === "valid"
                          ? false
                          : true
                      }
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
