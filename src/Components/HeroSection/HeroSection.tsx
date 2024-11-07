import { useEffect, useState } from "react";
import { sectionsMain } from "../Main/Main";
import "./heroSection.scss";
import { useFormatDate } from "../../hooks/useFormatDate";

interface HeroSection {
  hero?: sectionsMain;
}

export const HeroSection = ({ hero }: HeroSection) => {
  const formattedDate = useFormatDate(hero?.items[0].date || "");
  const duration = `${hero?.items[0].duration} min`;

  // console.log(hero?.items[0].accent);
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  // const [isMediaScreen, setIsMediaScreen] = useState(window.innerWidth > 767);
  // // const [isMediaScreen, setIsMediaScreen] = useState(window.innerWidth > 767);
  // const [maskMedia, setMaskMedia] = useState<string>("");

  // useEffect(() => {
  //   const handleLargeResize = () => {
  //     setIsLargeScreen(window.innerWidth > 992);
  //     setMaskMedia("for 992+");
  //   };

  //   window.addEventListener("resize", handleLargeResize);
  //   return () => {
  //     window.removeEventListener("resize", handleLargeResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleLargeResize = () => {
  //     setIsMediaScreen(window.innerWidth > 767);
  //     setMaskMedia(">767");
  //   };

  //   window.addEventListener("resize", handleLargeResize);

  //   return () => {
  //     window.removeEventListener("resize", handleLargeResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isLargeScreen) {
  //     console.log("maskMedia", maskMedia);
  //   }

  //   if (isMediaScreen) {
  //     console.log("maskMedia", maskMedia);
  //   }
  // }, [isLargeScreen, isMediaScreen]);

  return (
    <section id="gaming" className="section-hero">
      <div className="container">
        <div className="hero">
          <div className="hero__picture-wrapper">
            <picture className="hero__gaming-picture">
              <img
                className="hero__gaming-img"
                src={hero?.items[0].img.url}
                alt="Gaming Section Cover"
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
