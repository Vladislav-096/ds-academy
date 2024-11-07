import { useFormatDate } from "../../hooks/useFormatDate";
import { sectionsConten } from "../Main/Main";
import "./popularSection.scss";

interface PopularSection {
  popular?: sectionsConten;
}

export const PopularSection = ({ popular }: PopularSection) => {
  const formattedDate = useFormatDate(popular?.items[0].date || "");
  const duration = `${popular?.items[0].duration} min`;

  function isEachThirdElement(index: number) {
    if ((index + 1) % 3 === 0) {
      return true;
    }

    return false;
  }

  return (
    <section className="section-popular">
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
                  className={
                    isEachThirdElement(index)
                      ? `popular__picture ${item.img.shape}`
                      : `popular__picture ${item.img.shape}`
                  }
                >
                  <img
                    className="popular__img"
                    src={item.img.url}
                    alt="Design Section Cover"
                  />
                </picture>
                {/* <picture className="popular__sticker">
                  <img
                    className="popular__sticker-img"
                    src="./img/design-sticker.svg"
                    alt="Design-sticker"
                  />
                </picture> */}
              </div>
              <div
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
