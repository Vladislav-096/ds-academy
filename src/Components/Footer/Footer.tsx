import { contacts, menuFooter } from "../Layout/Layout";
import "../../styles/common.scss";
import "./footer.scss";
import { useRef, useState } from "react";

interface Footer {
  contacts?: contacts;
  footer: menuFooter[];
}

type dropdowns = Record<string, number>;

export const Footer = ({ contacts, footer }: Footer) => {
  const [dropdownsStatus, setDropdownsStatus] = useState<dropdowns>({});
  const ulRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function changeDropdownStatus(index: number): void {
    if (dropdownsStatus[index] === undefined || dropdownsStatus[index] === 0) {
      setDropdownsStatus((prev) => {
        return { ...prev, [index]: 1 };
      });
    } else {
      setDropdownsStatus((prev) => {
        return { ...prev, [index]: 0 };
      });
    }
  }

  function formatPhoneNumber(phoneNumber: string) {
    let copyStrArray = phoneNumber.split("");
    const lastPart = copyStrArray.splice(-4).join("");
    const thirdPart = copyStrArray.splice(-4).join("");
    const secontPart = copyStrArray.splice(-2).join("");
    const firstPatr = copyStrArray.join("");
    const result = `+${firstPatr} ${secontPart} ${thirdPart}-${lastPart}`;
    return result;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo-nav-block">
            <div className="footer__logo-block">
              <div className="footer__pictures">
                <a href="#">
                  <picture className="footer__logo-picture">
                    <img
                      className="footer__logo-img"
                      src="./src/assets/logo-ebac-footer.svg"
                      alt="Logo image"
                    />
                  </picture>
                </a>
                <picture className="footer__reward-picture">
                  <img
                    className="footer__reward-img"
                    src="./src/assets/reward.svg"
                    alt="Reward image"
                  />
                </picture>
              </div>
              <div className="footer__buttons">
                <button className="btn-reset footer__button-email">
                  {contacts?.subscription["email-placeholder"]}
                </button>
                <button className="btn-reset footer__button-subscribe">
                  {contacts?.subscription["submit-text"]}
                </button>
              </div>
              <ul className="list-reset footer__sotial-block">
                <li className="footer__sotial-list-item">
                  <a href={contacts?.instagram} className="footer__sotial-link">
                    <picture className="footer__sotial-picture">
                      <img
                        className="footer__sotial-img"
                        src="./src/assets/instagram.svg"
                        alt="Instagram icon"
                      />
                    </picture>
                  </a>
                </li>
                <li className="footer__sotial-list-item">
                  <a href={contacts?.facebook} className="footer__sotial-link">
                    <picture className="footer__sotial-picture">
                      <img
                        className="footer__sotial-img"
                        src="./src/assets/facebook.svg"
                        alt="Facebook icon"
                      />
                    </picture>
                  </a>
                </li>
                <li className="footer__sotial-list-item">
                  <a href={contacts?.youtube} className="footer__sotial-link">
                    <picture className="footer__sotial-picture">
                      <img
                        className="footer__sotial-img"
                        src="./src/assets/utube.svg"
                        alt="Youtube icon"
                      />
                    </picture>
                  </a>
                </li>
                <li className="footer__sotial-list-item">
                  <a href={contacts?.linkedin} className="footer__sotial-link">
                    <picture className="footer__sotial-picture">
                      <img
                        className="footer__sotial-img"
                        src="./src/assets/in.svg"
                        alt="In icon"
                      />
                    </picture>
                  </a>
                </li>
              </ul>
            </div>
            <nav className="footer__nav-block">
              {footer.map((item, index) => (
                <div key={index} className="footer__nav-list-block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeDropdownStatus(index);
                    }}
                    ref={buttonRef}
                    className={
                      dropdownsStatus[index]
                        ? "btn-reset footer__nav-button turn-dropdow-button-arrow"
                        : "btn-reset footer__nav-button"
                    }
                  >
                    {item.label}
                  </button>
                  <ul
                    ref={ulRef}
                    className={
                      dropdownsStatus[index]
                        ? "list-reset footer__nav-list show-dropdown"
                        : "list-reset footer__nav-list"
                    }
                  >
                    {item.items.map((navElement, navIndex) => (
                      <li key={navIndex} className="footer__nav-list-item">
                        <a
                          className="footer__nav-list-item-link"
                          href={navElement.url}
                        >
                          {navElement.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="footer__contacts-block">
            <div className="footer__contact-wrapper">
              <p className="footer__contact-name">WHATSAPP</p>
              <a
                href={`tel:+${contacts?.whatsapp}`}
                className="footer__contact"
              >
                {formatPhoneNumber(contacts?.whatsapp || "")}
              </a>
            </div>
            <div className="footer__contact-wrapper">
              <p className="footer__contact-name">TELEFONE</p>
              <a
                href={`tel:+${contacts?.whatsapp}`}
                className="footer__contact"
              >
                {formatPhoneNumber(contacts?.phone || "")}
              </a>
            </div>
            <div className="footer__contact-wrapper">
              <p className="footer__contact-name">EMAIL</p>
              <p className="footer__contact"></p>
              <a href={`mailto:${contacts?.email}`} className="footer__contact">
                {contacts?.email}
              </a>
            </div>
          </div>
          <ul className="list-reset footer__sotial-block">
            <li className="footer__sotial-list-item">
              <a href={contacts?.instagram} className="footer__sotial-link">
                <picture className="footer__sotial-picture">
                  <img
                    className="footer__sotial-img"
                    src="./src/assets/instagram.svg"
                    alt="Instagram icon"
                  />
                </picture>
              </a>
            </li>
            <li className="footer__sotial-list-item">
              <a href={contacts?.facebook} className="footer__sotial-link">
                <picture className="footer__sotial-picture">
                  <img
                    className="footer__sotial-img"
                    src="./src/assets/facebook.svg"
                    alt="Facebook icon"
                  />
                </picture>
              </a>
            </li>
            <li className="footer__sotial-list-item">
              <a href={contacts?.youtube} className="footer__sotial-link">
                <picture className="footer__sotial-picture">
                  <img
                    className="footer__sotial-img"
                    src="./src/assets/utube.svg"
                    alt="Youtube icon"
                  />
                </picture>
              </a>
            </li>
            <li className="footer__sotial-list-item">
              <a href={contacts?.linkedin} className="footer__sotial-link">
                <picture className="footer__sotial-picture">
                  <img
                    className="footer__sotial-img"
                    src="./src/assets/in.svg"
                    alt="In icon"
                  />
                </picture>
              </a>
            </li>
          </ul>
          <div className="footer__buttons">
            <button className="btn-reset footer__button-email">
              {contacts?.subscription["email-placeholder"]}
            </button>
            <button className="btn-reset footer__button-subscribe">
              {contacts?.subscription["submit-text"]}
            </button>
          </div>
          <ul className="list-reset footer__terms-block">
            {contacts?.links.map((item, index) => (
              <li key={index} className="footer__terms-list-item">
                <a className="footer__terms-list-item-link" href={item.url}>
                  {item.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
