import { sectionsMain } from "../Main/Main";
import "./heroSection.scss";
import { formatDate } from "../../utils/formatDate";
import { Sticker } from "../Sticker/Sticker";
import { createPosition } from "../../utils/createPosition";
import { createMask } from "../../utils/createMask";

interface HeroSection {
  hero?: sectionsMain;
}

export const HeroSection = ({ hero }: HeroSection) => {
  const formattedDate = formatDate(hero?.items[0].date || "");
  const duration = `${hero?.items[0].duration} min`;
  const stickerPosition = createPosition(
    hero?.items[0].stamp.position || ""
  );
  const mask = createMask(hero?.items[0].img.shape || "");

  return (
    <section id="gaming" className="section-hero">
      <div className="container">
        <div className="hero">
          <div className="hero__picture-wrapper">
            <picture style={mask} className="hero__gaming-picture">
              <img
                className="hero__gaming-img"
                src={hero?.items[0].img.url}
                alt="Gaming Section Cover"
              />
            </picture>
            <picture style={stickerPosition} className="hero__sticker">
              <Sticker
                type={hero?.items[0].stamp.type || ""}
                background={hero?.items[0].accent || ""}
              />
            </picture>
          </div>
          <div className="hero__descr-block">
            <ul className="list-reset hero__list">
              {hero?.items[0].tags.map((item, index) =>
                index === 0 ? (
                  <li key={index} className="hero__list-item">
                    <div
                      style={{ backgroundColor: `${hero?.items[0].accent}` }}
                      className="chosen-hero-option"
                    >
                      {item}
                    </div>
                  </li>
                ) : (
                  <li key={index} className="hero__list-item">
                    {item}
                  </li>
                )
              )}
            </ul>
            <h1 className="hero__heading">{hero?.items[0].title}</h1>
            <p className="hero__descr">{hero?.items[0].text}</p>
            <div className="date-hero">
              <span className="schedule-date">{formattedDate}</span>
              <span className="schedule-duration">{duration}</span>
            </div>
            <button
              style={{ backgroundColor: `${hero?.items[0].accent}` }}
              className="btn-reset hero__button"
            >
              {hero?.items[0]["browse-text"]}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
