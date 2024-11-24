import { useContext, useRef, useState } from "react";
import styles from "./settings.module.scss";
import { useClickOutside } from "../../hooks/useClickOutside";
import { SettingsContext } from "../../context/SettingsContext";

const difficulties = [
  { name: "Easy", duration: 300000, mistakesLimit: 30, fieldSize: 8 },
  { name: "Normal", duration: 240000, mistakesLimit: 30, fieldSize: 18 },
  { name: "Hard", duration: 180000, mistakesLimit: 30, fieldSize: 32 },
];

interface Settings {
  duration: number;
  mistakesLimit: number;
  fieldSize: number;
}

export const Settings = () => {
  const [dropdownDifficulty, setDropdownDifficulty] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const suggestRef = useRef<HTMLUListElement>(null);
  const { settings, setSettings } =
    useContext<SettingsContext>(SettingsContext);

  const handleDifficultyDropdown = () => {
    setDropdownDifficulty((prev) => !prev);
  };

  const handleChooseDifficulty = (settingsData: Settings) => {
    setSettings(settingsData);
  };

  const modifiedFieldSize = (amountOfCards: number) => {
    let cardsInRow = Math.sqrt(amountOfCards * 2);
    let result = `${cardsInRow}x${cardsInRow}`;
    return result;
  };

  const modifiedTime = (timeInMiliseconds: number) => {
    return timeInMiliseconds / 1000 / 60;
  };

  useClickOutside([buttonRef, suggestRef], () => {
    console.log("useClickOutside");
    setDropdownDifficulty(false);
  });

  return (
    <div className={styles.settings}>
      <div className={styles["dropdown-difficulty"]}>
        <button
          ref={buttonRef}
          onClick={handleDifficultyDropdown}
          className={`${styles["difficulty-button"]}`}
        >
          Choose difficulty
        </button>
        <ul
          ref={suggestRef}
          className={`list-reset ${styles["difficulty-options"]} ${
            dropdownDifficulty ? styles["show-dropdown"] : ""
          }`}
        >
          {difficulties.map((item, index) => (
            <li
              onClick={() => {
                handleChooseDifficulty({
                  duration: item.duration,
                  mistakesLimit: item.mistakesLimit,
                  fieldSize: item.fieldSize,
                });
                handleDifficultyDropdown();
              }}
              key={index}
              className={styles.option}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {settings && (
        <div className={styles["difficulty-info"]}>
          <h2 className={styles.heading}>Difficulty info</h2>
          <ul className={styles["difficulty-list"]}>
            <li className={styles.info}>{`Game field size: ${modifiedFieldSize(
              settings?.fieldSize
            )}`}</li>
            <li className={styles.info}>{`Game duration: ${modifiedTime(
              settings?.duration
            )} min`}</li>
            <li
              className={styles.info}
            >{`Mistakes Limit: ${settings?.mistakesLimit}`}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
