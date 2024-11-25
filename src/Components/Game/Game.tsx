import { useContext, useEffect, useRef, useState } from "react";
import { GetAvatar } from "../../api/getAvatar";
import { ResultContext } from "../../context/ResultsContext";
import styles from "./game.module.scss";
// import back from "../../assets/back.png";
import { PopUp } from "../PopUp/PopUp";
import { Result } from "../Result/Result";
import { Loader } from "../Loader/Loader";
import { SessionResultContext } from "../../context/SessionResultContext";
import { SettingsContext } from "../../context/SettingsContext";

export interface card {
  id: number;
  name: string;
  url: string;
}

let dataArray: card[] = [];
let clickedCardsStorage: { [key: string]: number } = {};

const generateRandomString = () => {
  let length = 10;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

const createCard = async (seed: string, id: number) => {
  try {
    let result = await GetAvatar({ seed });
    dataArray.push({ id, name: seed, url: result });
  } catch (error) {
    console.log("Error fetching avatar:", error);
    throw error;
  }
};

export const Game = () => {
  const { games, setGames } = useContext<ResultContext>(ResultContext);
  const { result, setResult } =
    useContext<SessionResultContext>(SessionResultContext);
  const { settings } = useContext<SettingsContext>(SettingsContext);
  const [cards, setCards] = useState<card[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const gameTimer = useRef<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [mistake, setMistake] = useState<number>(0);
  const [madeTooManyMistakes, setMadeTooManyMistakes] =
    useState<boolean>(false);

  const stopTheGame = () => {
    dataArray = [];
    setCards([]);
    if (settings) {
      setTimeRemaining(settings?.duration);
    }

    setClearedCards([]);
    setOpenedCards([]);
    setMadeTooManyMistakes(false);
    setMistake(0);
  };

  const createGaymBoard = async () => {
    setIsLoader(true);
    // setIsMenuDisabled(true);
    setMistake(0);
    setMadeTooManyMistakes(false);
    setClearedCards([]);
    dataArray = [];

    if (settings) {
      for (let i = 0; i < settings?.fieldSize; i++) {
        await createCard(generateRandomString(), i);
      }
    }

    shuffleCards(dataArray.concat(dataArray));
  };

  const shuffleCards = (arr: card[]) => {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    setCards(arr);
    setIsLoader(false);
    if (settings) {
      setTimeRemaining(settings?.duration);
    }
  };

  const handleClick = (index: number) => {
    setIsTimeOver(false);
    if (checkIsFlipped(index) || openedCards.length === 2) {
      return;
    }

    const key = String(index);

    if (clickedCardsStorage[key] === undefined) {
      clickedCardsStorage[key] = 1;
    } else {
      clickedCardsStorage[key]++;
    }
    // console.log("clickedCardsStorage", clickedCardsStorage);

    handleFindDuplicates(index);
  };

  const handleFindDuplicates = (index: number) => {
    if (openedCards.length === 1) {
      setOpenedCards((prev) => [...prev, index]);
    } else {
      // if (cardsTimeout.current) {
      //   clearTimeout(cardsTimeout.current);
      // }
      setOpenedCards([index]);
    }
  };

  const checkIsFlipped = (index: number) => {
    return openedCards.includes(index);
  };

  const evaluate = () => {
    const [first, second] = openedCards;

    if (cards[first].id === cards[second].id) {
      setClearedCards((prev) => [...prev, first, second]);
    } else {
      if (clickedCardsStorage[first] >= 2) {
        setMistake((prev) => prev + 1);
      }

      if (clickedCardsStorage[second] >= 2) {
        setMistake((prev) => prev + 1);
      }
    }

    // cardsTimeout.current = setTimeout(() => {
    setOpenedCards([]);
    // }, 500);
  };

  const checkCompletion = () => {
    if (clearedCards.length === cards.length && settings && gameTimer.current) {
      // setIsMenuDisabled(false);

      clearTimeout(gameTimer.current);

      const score =
        (clearedCards.length * 5 - mistake) / (settings.duration / 1000 / 60);

      setCurrentScore(score);
      if (result && result?.maxScore < score) {
        setResult({
          amountOfGames: result?.amountOfGames + 1,
          maxScore: score,
        });
      } else {
        setResult({
          amountOfGames: (result?.amountOfGames || 0) + 1,
          maxScore: result?.maxScore || score,
        });
      }

      if (timeRemaining) {
        setGames({
          date: new Date(),
          duration: (settings?.duration - timeRemaining) / 1000,
          mistakesCount: 0,
          difficulty: "null",
          score: score,
        });
      }

      new Promise((res) => {
        setTimeout(() => res(setIsPopUp(true)), 1000);
      });
    }
  };

  const checkPair = (index: number) => {
    if (clearedCards.includes(index)) {
      return true;
      // return new Promise((res) => {
      //   setTimeout(() => res(true), 500);
      // });
    }

    return false;
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const cardsContainerWidth = () => {
    if (settings) {
      switch (settings.fieldSize) {
        case 8:
          return { width: "370px" };
        case 18:
          return { width: "548px" };
        case 32:
          return { width: "526px" };
      }
    }
  };

  const cardsWidth = () => {
    if (settings && settings.fieldSize === 32) {
      return { width: "50px", height: "67px" };
    } else {
      return { width: "75px", height: "100px" };
    }
  };

  const calculateMaxScoreAtAll = () => {
    let result = 0;

    if (games.length !== 0) {
      result = games.reduce((acc, item) => {
        return item.score > acc ? item.score : acc;
      }, 0);
    }

    return result;
  };

  const progress = () => {
    let progress = (clearedCards.length * 100) / cards.length || 0;
    return progress.toFixed(1);
  };

  useEffect(() => {
    // Time is over
    if (timeRemaining && timeRemaining <= 0) {
      setIsTimeOver(true);
      setCurrentScore(0);
      // Add one game count when loss
      setResult({
        amountOfGames: (result?.amountOfGames || 0) + 1,
        maxScore: result?.maxScore || 0,
      });
      setIsPopUp(true);
      // setIsMenuDisabled(false);
      return;
    }

    if (cards.length > 0) {
      gameTimer.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1000);
      }, 1000);
    }

    return () => {
      if (gameTimer.current) {
        clearInterval(gameTimer.current);
      }
    };
  }, [timeRemaining, cards]);

  useEffect(() => {
    if (clearedCards.length > 0) {
      checkCompletion();
    }
  }, [clearedCards]);

  useEffect(() => {
    let timeout = null;
    if (openedCards.length === 2) {
      timeout = setTimeout(evaluate, 777);
    }

    // Made max amount of mistakes

    if (settings && mistake >= settings?.mistakesLimit) {
      if (gameTimer.current) {
        clearTimeout(gameTimer.current);
      }
      setCurrentScore(0);
      setIsPopUp(true);
      setMadeTooManyMistakes(true);
    }

    console.log("mistake", mistake);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [openedCards]);

  return (
    <div className={styles.game}>
      <PopUp active={isPopUp} setActive={setIsPopUp}>
        <Result
          active={isPopUp}
          finalScore={currentScore}
          isTimeOver={isTimeOver}
          madeTooManyMistakes={madeTooManyMistakes}
        />
      </PopUp>

      <ul className={styles.info}>
        <li>{`Amount of games it the current session: ${
          result?.amountOfGames || 0
        }`}</li>
        <li className={styles["info-item"]}>{`Max score in current session: ${
          result?.maxScore || 0
        }`}</li>
        <li
          className={styles["info-item"]}
        >{`Max score for all time: ${calculateMaxScoreAtAll()}`}</li>
        <li
          className={styles["info-item"]}
        >{`Amount of mistakes: ${mistake}`}</li>
        <li className={styles["info-item"]}>{`Progress: ${progress()} %`}</li>
        <li className={styles["info-item"]}>{formatTime(timeRemaining)}</li>
      </ul>

      <div style={cardsContainerWidth()} className={styles["cards-container"]}>
        {cards.map((card, index) => (
          <div
            onClick={() => handleClick(index)}
            style={cardsWidth()}
            key={index}
            className={`${styles.card} ${
              checkIsFlipped(index) ? styles.flipped : ""
            }
            ${checkPair(index) ? styles.inactive : ""}
            `}
          >
            <picture className={styles.back}>
              <div>{card.id}</div>
            </picture>
            <picture
              className={`${styles.front} ${
                checkPair(index) ? styles.guessed : ""
              }`}
            >
              <img
                className={styles["img-front"]}
                src={card.url}
                alt="Card image"
              />
            </picture>
          </div>
        ))}
      </div>

      <div className={styles.button}>
        {isLoader ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <>
            <button className={styles.start} onClick={createGaymBoard}>
              {dataArray.length === 0 ? "Start" : "Restart"}
            </button>
            <button onClick={stopTheGame} className={styles.stop}>
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
};
