import { ChangeEvent, useRef, useState } from "react";
import { sectionsSubscription } from "../Main/Main";
import "./subscriptionSection.scss";
import { postData } from "../../api/PostData";

interface SubscriptionSection {
  subscription?: sectionsSubscription;
}

export const SubscriptionSection = ({ subscription }: SubscriptionSection) => {
  const [inputText, setInputText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTextValid, setIsTextValid] = useState<boolean>(false);
  const [isMarkChecked, setIsMarkChecked] = useState<boolean>(false);
  const [isDataSubmitted, setIsDataSubmitter] = useState<boolean>(false);
  // const [formData, setFormData] = useState<Record<string, string>>({});
  const marqueeBackgroundColor = subscription?.ticker.color;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await postData({ mail: inputText });
      console.log("Form submitted successfully:", res);
      setIsDataSubmitter(true);
    } catch (error) {
      setErrorMessage(`Failed to submit form. Please try again. ${error}`);
      console.error("Error submitting form:", error);
    }
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

  return (
    <section className="section-subscription">
      <div className="discount-marquee">
        <div
          style={{ backgroundColor: marqueeBackgroundColor }}
          className="marquee"
        >
          <div className="marquee__content">
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">
                  {subscription?.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-white.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {subscription?.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-white.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">
                  {subscription?.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-white.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {subscription?.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-white.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">
                  {subscription?.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-white.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {subscription?.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-white.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
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
                      type="submit"
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
