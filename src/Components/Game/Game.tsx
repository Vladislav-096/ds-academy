import { useContext, useEffect, useRef, useState } from "react";
import { GetAvatar } from "../../api/getAvatar";
import { ResultContext } from "../../context/ResultsContext";
import styles from "./game.module.scss";
import back from "../../assets/back.png";
import { PopUp } from "../PopUp/PopUp";
import { Result } from "../Result/Result";
import { Loader } from "../Loader/Loader";
import { SessionResultContext } from "../../context/SessionResultContext";

export interface card {
  id: number;
  name: string;
  url: string;
}

let dataArray: card[] = [];

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
  const [cards, setCards] = useState<card[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
  const { setGames } = useContext<ResultContext>(ResultContext);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const { result, setResult } =
    useContext<SessionResultContext>(SessionResultContext);
  // const cardsTimeout = useRef<number | null>(null);
  const gameTimer = useRef<number | null>(null);
  // just test
  const cardsCount = 4;
  const duration = 60000;
  // console.log("cards", cards);
  // console.log("openedCards", openedCards);
  console.log("clearedCards", clearedCards);
  //
  const [timeRemaining, setTimeRemaining] = useState(duration);
  // console.log("timeRemaining", timeRemaining);

  const createGaymBoard = async () => {
    setIsLoader(true);

    for (let i = 0; i < cardsCount; i++) {
      await createCard(generateRandomString(), i);
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
  };

  const handleClick = (index: number) => {
    setIsTimeOver(false);
    console.log("click");
    if (checkIsFlipped(index) || openedCards.length === 2) {
      return;
    }

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
    }

    // cardsTimeout.current = setTimeout(() => {
    setOpenedCards([]);
    // }, 500);
  };

  const checkCompletion = () => {
    if (clearedCards.length === cards.length) {
      if (gameTimer.current) {
        clearTimeout(gameTimer.current);
      }
      const score = (timeRemaining / 1000) * clearedCards.length;
      setCurrentScore(score);
      if (result && result?.maxScore < score) {
        setResult({
          amountOfGames: result?.amountOfGames + 1,
          maxScore: score,
        });
      } else {
        setResult({
          amountOfGames: (result?.amountOfGames || 1) + 1,
          maxScore: result?.maxScore || score,
        });
      }
      setGames({
        date: new Date(),
        duration: (duration - timeRemaining) / 1000,
        mistakesCount: 0,
        difficulty: "null",
        score: score,
      });
      new Promise((res) => {
        setTimeout(() => res(setIsPopUp(true)), 500);
      });
    }
  };

  const checkPair = (index: number) => {
    if (clearedCards.includes(index)) {
      return new Promise((res) => {
        setTimeout(() => res(true), 500);
      });
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

  useEffect(() => {
    console.log("попал");

    if (timeRemaining <= 0) {
      setIsTimeOver(true);
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
      timeout = setTimeout(evaluate, 500);
    }

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
        />
      </PopUp>

      <div>{formatTime(timeRemaining)}</div>

      <div className={styles["cards-container"]}>
        {cards.map((card, index) => (
          <div
            onClick={() => handleClick(index)}
            key={index}
            className={`${styles.card} ${
              checkIsFlipped(index) ? styles.flipped : ""
            }
            ${checkPair(index) ? styles.inactive : ""}
            `}
          >
            <picture className={styles.front}>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "10px",
                  height: "10px",
                }}
              >
                {card.id}
              </div>
              <img className={styles["img-back"]} src={back} alt="Card image" />
            </picture>
            <picture
              className={`${styles.back} ${
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
          <Loader />
        ) : (
          <button className={styles.start} onClick={createGaymBoard}>
            Start
          </button>
        )}
      </div>
    </div>
  );
};
