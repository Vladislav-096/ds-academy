import { menuHeader } from "../Layout/Layout";
import "./header.scss";

interface Header {
  logo: string;
  header: menuHeader[];
}

export const Header = ({ logo, header }: Header) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__block">
            <a href="#">
              <picture className="header__logo-picture"></picture>
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
            <a href="#" className="header__logo-abbreviation">EBAC</a>
          </div>
        </div>
      </div>
    </header>
  );
};
