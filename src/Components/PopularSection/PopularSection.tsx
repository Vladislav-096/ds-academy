import { createMask } from "../../utils/createMask";
import { createPosition } from "../../utils/createPosition";
import { formatDate } from "../../utils/formatDate";
import { sectionsConten } from "../Main/Main";
import { Sticker } from "../Sticker/Sticker";
import "./popularSection.scss";

interface PopularSection {
  popular?: sectionsConten;
}

export const PopularSection = ({ popular }: PopularSection) => {
  const formattedDate = formatDate(popular?.items[0].date || "");
  const duration = `${popular?.items[0].duration} min`;
  const marqueeBackgroundColor = popular?.ticker.color;

  function isEachThirdElement(index: number) {
    if ((index + 1) % 3 === 0) {
      return true;
    }

    return false;
  }

  return (
    <section className="section-popular">
      <div className="webinars-marquee">
        <div
          style={{ backgroundColor: marqueeBackgroundColor }}
          className="marquee"
        >
          <div className="marquee__content">
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{popular?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="list-reset popular">
          {popular?.items.map((item, index) => (
            <li
              key={index}
              className={
                isEachThirdElement(index)
                  ? "content-card popular__card-middle"
                  : "content-card popular__card"
              }
            >
              <div
                className={
                  isEachThirdElement(index)
                    ? "popular__picture-wrapper-middle"
                    : "popular__picture-wrapper"
                }
              >
                <picture
                  style={createMask(item.img.shape)}
                  className="popular__picture"
                >
                  <img
                    className="popular__img"
                    src={item.img.url}
                    alt="Section Cover"
                  />
                </picture>
                <picture
                  style={
                    item.stamp.type === "signboard"
                      ? {
                          width: "274px",
                          height: "206px",
                          top: "-77px",
                          left: "-58px",
                        }
                      : createPosition(item.stamp.position)
                  }
                  className={
                    item.stamp.type === "signboard"
                      ? "popular__sticker signboard"
                      : isEachThirdElement(index)
                      ? "popular__sticker third-card-picture"
                      : "popular__sticker"
                  }
                >
                  <Sticker type={item.stamp.type} background={item.accent} />
                </picture>
              </div>
              <div
                // style={{position: 'relative', top: '1'}} remove
                className={
                  isEachThirdElement(index)
                    ? "popular__descr-middle-wrapper"
                    : "popular__descr-wrapper"
                }
              >
                <ul
                  className={
                    isEachThirdElement(index)
                      ? "list-reset popular__list popular__descr-middle-element popular__list-middle"
                      : "list-reset popular__list"
                  }
                >
                  {item.tags.map((navEl, navIndex) => (
                    <li
                      key={navIndex}
                      style={{ color: item.accent }}
                      className={
                        isEachThirdElement(index)
                          ? "popular__list-item popular__design-middle-list-item"
                          : "popular__list-item"
                      }
                    >
                      {isEachThirdElement(index) && navIndex === 0 && (
                        <div
                          style={{ backgroundColor: item.accent }}
                          className="chosen-design-middle-option"
                        >
                          {navEl}
                        </div>
                      )}

                      {!isEachThirdElement(index) && navIndex === 0 && (
                        <div
                          style={{ backgroundColor: item.accent }}
                          className="chosen-design-option"
                        >
                          {navEl}
                        </div>
                      )}

                      {navIndex !== 0 && navEl}
                    </li>
                  ))}
                </ul>
                <h3
                  className={
                    isEachThirdElement(index)
                      ? "popular__heading popular__descr-middle-element popular__heading-middle"
                      : "popular__heading"
                  }
                >
                  {item.title}
                </h3>
                <p
                  className={
                    isEachThirdElement(index)
                      ? "popular__descr popular__descr-middle-element popular__descr-middle"
                      : "popular__descr"
                  }
                >
                  {item.text}
                </p>
                <div
                  className={
                    isEachThirdElement(index)
                      ? "popular__descr-middle-element date-middle"
                      : ""
                  }
                >
                  <span
                    className={
                      isEachThirdElement(index)
                        ? "schedule-date schedule-date-middle"
                        : "schedule-date"
                    }
                  >
                    {formattedDate}
                  </span>
                  <span
                    className={
                      isEachThirdElement(index)
                        ? "schedule-duration schedule-duration-middle"
                        : "schedule-duration"
                    }
                  >
                    {duration}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
