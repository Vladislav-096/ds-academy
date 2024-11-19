import { Link } from "react-router-dom";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link to={"/game"} className={styles.link}>
            Game
          </Link>
          <Link to={"/settings"} className={styles.link}>
            Settings
          </Link>
          <Link to={"/results"} className={styles.link}>
            Results
          </Link>
        </nav>
      </div>
    </header>
  );
};
