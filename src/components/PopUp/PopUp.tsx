import { ReactNode } from "react";
import styles from "./popUp.module.scss";

interface PopUp {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const PopUp = ({ active, setActive, children }: PopUp) => {
  return (
    <div
      onClick={() => setActive(false)}
      className={`${styles.modal} ${active ? styles.active : ""}`}
    >
      {children}
    </div>
  );
};
