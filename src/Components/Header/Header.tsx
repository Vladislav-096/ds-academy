import { useEffect, useState } from "react";
import { menuHeader } from "../Layout/Layout";
import "./header.scss";

interface Header {
  logo: string;
  header: menuHeader[];
}

export const Header = ({ logo, header }: Header) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hoveredLogo = "./src/assets/logo-hovered.svg";

  function handleHovered() {
    setIsHovered((prev) => !prev);
  }

  useEffect(() => {
    let lastScrollY = window.scrollY; // Сохраняю последнюю позицию скролла

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Если скроллю вниз, прячю хедер
        setIsVisible(false);
      } else {
        // Если скроллю вверх, показываю хедер
        setIsVisible(true);
      }

      lastScrollY = window.scrollY; // Обновляю последнюю позицию скролла
    };

    window.addEventListener("scroll", handleScroll); // Добавляю обработчик события скролла

    return () => {
      window.removeEventListener("scroll", handleScroll); // Убираю обработчик при размонтировании
    };
  }, []);

  return (
    <header className={isVisible ? "header" : "header header-hide"}>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__block">
            <a href="#">
              <picture className="header__logo-picture">
                <img
                  onMouseEnter={handleHovered}
                  onMouseLeave={handleHovered}
                  src={isHovered ? hoveredLogo : logo}
                  alt="logo"
                />
              </picture>
            </a>
          </div>
          <nav className="header__block">
            <ul className="list-reset header__menu-list">
              {header.map((item, index) => (
                <li key={index} className="header__menu-item">
                  <a href={item.url} className="header__menu-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__block">
            <button className="btn-reset header__search-button">
              <img src="./src/assets/search-icon.svg" alt="Search icon" />
            </button>
            <a href="#" className="header__logo-abbreviation">
              EBAC
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
