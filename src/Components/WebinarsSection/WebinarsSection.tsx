import { formatDate } from "../../utils/formatDate";
import { sectionsProposals } from "../Main/Main";
import "./webinarsSection.scss";

interface WebinarsSection {
  webinars?: sectionsProposals;
}

export const WebinarsSection = ({ webinars }: WebinarsSection) => {
  const marqueeBackgroundColor = webinars?.ticker.color;

  return (
    <section className="section-webinars">
      <div className="subscription-marquee">
        <div
          style={{ backgroundColor: marqueeBackgroundColor }}
          className="marquee"
        >
          <div className="marquee__content">
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
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
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
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
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">{webinars?.ticker.text}</h2>
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
      <picture className="line-bg-picture line-bg-third-picture">
        <source
          media="(max-width: 992px)"
          srcSet="./src/assets/line-bg-3.1.svg"
        />
        <img
          className="line-bg-image"
          src="./src/assets/line-bg-3.svg"
          alt=""
        />
      </picture>
      <div className="container">
        <div className="webinars">
          <h3 className="webinars__heading">{webinars?.title}</h3>
          <button className="btn-reset webinars__button">
            {webinars?.["browse-all-text"]}
          </button>
          <ul className="list-reset webinars__cards-list">
            {webinars?.items.map((item, index) => (
              <li
                style={{ backgroundColor: item.background }}
                key={index}
                className="webinars__card-list-item"
              >
                <div className="webinars__card-bio">
                  <picture className="webinars__card-picture">
                    <img
                      className="webinars__card-img"
                      src={item.author.img}
                      alt="Avatar picture"
                    />
                  </picture>
                  <div className="webinars__card-bio-info-block">
                    <h3 className="webinars__card-bio-name">
                      {item.author.name}
                    </h3>
                    <span className="webinars__card-bio-descr">
                      {item.author.position}
                    </span>
                  </div>
                </div>
                <p className="webinars__card-descr">{item.text}</p>
                <div className="webinars__schedule">
                  <p className="webinars__schedule-heading">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex}>{tag}</span>
                    ))}
                  </p>
                  <div className="webinars__date-duration">
                    <span className="schedule-date">
                      {`${formatDate(item.date_from)}, ${formatDate(
                        item.date_to
                      )}`}
                    </span>
                    <span className="schedule-duration">{item.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
