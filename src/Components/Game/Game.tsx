import { useContext, useEffect, useRef, useState } from "react";
import { GetAvatar } from "../../api/getAvatar";
import { ResultContext } from "../../context/ResultsContext";
import styles from "./game.module.scss";
import back from "../../assets/back.png";

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
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const { setGames } = useContext(ResultContext);
  const timeout = useRef<number | null>(null);
  console.log(openedCards);
  console.log(clearedCards);

  const createGaymBoard = async () => {
    for (let i = 0; i < 6; i++) {
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
  };

  const handleClick = (index: number) => {
    if (checkIsFlipped(index) || openedCards.length === 2) {
      return;
    }

    handleFindDuplicates(index);
  };

  const handleFindDuplicates = (index: number) => {
    if (openedCards.length === 1) {
      setOpenedCards((prev) => [...prev, index]);
    } else {
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

    timeout.current = setTimeout(() => {
      setOpenedCards([]);
    }, 500);
  };

  const checkCompletion = () => {
    if (clearedCards.length === cards.length) {
      alert("Победа");
      setCurrentScore(111);
      setGames({
        date: new Date(),
        duration: "null",
        mistakesCount: "null",
        difficulty: "null",
        score: "111",
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

  useEffect(() => {
    if (clearedCards.length > 0) {
      checkCompletion();
    }
  }, [clearedCards]);

  useEffect(() => {
    let timeout = null;
    if (openedCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [openedCards]);

  // ${checkPair ? styles.inactive : ""}
  return (
    <div className={styles.game}>
      <button onClick={createGaymBoard}>knopochka</button>

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
            <picture className={`${styles.back} ${checkPair(index) ? styles.guessed : ""}`}>
              <img
                className={styles["img-front"]}
                src={card.url}
                alt="Card image"
              />
            </picture>
          </div>
        ))}
      </div>
    </div>
  );
};
