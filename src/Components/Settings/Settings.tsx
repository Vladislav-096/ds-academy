import { ChangeEvent, useContext, useRef, useState } from "react";
import styles from "./settings.module.scss";
import { useClickOutside } from "../../hooks/useClickOutside";
import { SettingsContext } from "../../context/SettingsContext";

interface Settings {
  duration: number;
  mistakesLimit: number;
  fieldSize: number;
}

interface Difficulties extends Settings {
  name: string;
}

interface FieldSize {
  name: string;
  fieldSize: number;
}

const difficulties: Difficulties[] = [
  { name: "Easy", duration: 300000, mistakesLimit: 30, fieldSize: 8 },
  { name: "Normal", duration: 240000, mistakesLimit: 30, fieldSize: 18 },
  { name: "Hard", duration: 180000, mistakesLimit: 30, fieldSize: 32 },
];

const fieldSize: FieldSize[] = [
  { name: "4x4", fieldSize: 8 },
  { name: "6x6", fieldSize: 18 },
  { name: "8x8", fieldSize: 32 },
];

export const Settings = () => {
  const [dropdownDifficulty, setDropdownDifficulty] = useState<boolean>(false);
  const [isCustomDifficulty, setIsCustomDifficulty] = useState<boolean>(false);
  const [dropdownFieldSize, setDropdownFieldSize] = useState<boolean>(false);
  const [durationInput, setDurationInput] = useState<string>("");
  const [mistakesText, setMistakesText] = useState<string>("");
  const buttonDifficultyRef = useRef<HTMLButtonElement>(null);
  const suggestDifficultyRef = useRef<HTMLUListElement>(null);
  const buttonFieldSizeRef = useRef<HTMLButtonElement>(null);
  const suggestFieldSizeRef = useRef<HTMLUListElement>(null);
  const timeoutDurationRef = useRef<number | null>(null);
  const timeoutMistakesRef = useRef<number | null>(null);
  const { settings, setSettings } =
    useContext<SettingsContext>(SettingsContext);
  // console.log("durationInput", durationInput);
  console.log("settings", settings);

  const handleDifficultyDropdown = () => {
    setDropdownDifficulty((prev) => !prev);
  };

  const handleCustomDifficulty = () => {
    setIsCustomDifficulty((prev) => !prev);
  };

  const handleChooseDifficulty = (settingsData: Settings) => {
    setSettings(settingsData);
  };

  const handleFieldSizeDropdown = () => {
    setDropdownFieldSize((prev) => !prev);
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      if (timeoutDurationRef.current) {
        clearTimeout(timeoutDurationRef.current);
      }

      setDurationInput(value);

      timeoutDurationRef.current = setTimeout(() => {
        if (settings) {
          const newSettings = { ...settings, duration: Number(value) };
          setSettings(newSettings);
        }
      }, 500);
    }
  };

  const handleMistakesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    timeoutMistakesRef;
    if (/^\d*$/.test(value)) {
      if (timeoutMistakesRef.current) {
        clearTimeout(timeoutMistakesRef.current);
      }
      setMistakesText(value);

      timeoutMistakesRef.current = setTimeout(() => {
        if (settings) {
          const newSettings = { ...settings, mistakesLimit: Number(value) };
          setSettings(newSettings);
        }
      }, 500);
    }
  };

  const handleChooseField = (fieldSize: number) => {
    if (settings) {
      const newSettings = { ...settings, fieldSize };
      setSettings(newSettings);
    }
    setDropdownFieldSize(false);
  };

  const modifiedFieldSize = (amountOfCards: number) => {
    let cardsInRow = Math.sqrt(amountOfCards * 2);
    let result = `${cardsInRow}x${cardsInRow}`;
    return result;
  };

  const modifiedTime = (timeInMiliseconds: number) => {
    return timeInMiliseconds / 1000 / 60;
  };

  useClickOutside(
    [
      buttonDifficultyRef,
      suggestDifficultyRef,
      buttonFieldSizeRef,
      suggestFieldSizeRef,
    ],
    () => {
      console.log("useClickOutside");
      setDropdownDifficulty(false);
      setDropdownFieldSize(false);
    }
  );

  return (
    <div className={styles.settings}>
      <div className={styles["dropdown-difficulty"]}>
        <button
          ref={buttonDifficultyRef}
          onClick={() => {
            handleDifficultyDropdown();
            setDropdownFieldSize(false);
          }}
          className={`${styles["difficulty-button"]}`}
        >
          Choose difficulty
        </button>
        <ul
          ref={suggestDifficultyRef}
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
                setIsCustomDifficulty(false);
              }}
              key={index}
              className={styles.option}
            >
              {item.name}
            </li>
          ))}
          <li
            onClick={() => {
              handleDifficultyDropdown();
              handleCustomDifficulty();
            }}
            className={styles.option}
          >
            Custom settings
          </li>
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
          {isCustomDifficulty && (
            <div className={styles["custom-settings"]}>
              <h2 className={styles.heading}>Custom settings</h2>
              <form>
                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Indicate game duration (in milliseconds)
                  </label>
                  <input
                    onChange={handleDurationChange}
                    value={durationInput}
                    className={styles.input}
                    type="text"
                  />
                </div>
                <div className={styles["input-wrapper"]}>
                  <label className={styles.label}>
                    Indicate mistakes limit
                  </label>
                  <input
                    onChange={handleMistakesChange}
                    value={mistakesText}
                    className={styles.input}
                    type="text"
                  />
                </div>
              </form>
              <div className={styles["dropdown-field-size"]}>
                <button
                  className={styles.button}
                  ref={buttonFieldSizeRef}
                  onClick={() => {
                    handleFieldSizeDropdown();
                    setDropdownDifficulty(false);
                  }}
                  type="button"
                >
                  Choose field size
                </button>
                <ul
                  ref={suggestFieldSizeRef}
                  className={`list-reset ${styles["field-size-options"]} ${
                    dropdownFieldSize ? styles["show-dropdown"] : ""
                  }`}
                >
                  {fieldSize.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleChooseField(item.fieldSize)}
                      className={styles.option}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
