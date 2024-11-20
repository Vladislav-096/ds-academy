import { useContext, useEffect, useState } from "react";
import { GetAvatar } from "../../api/getAvatar";
import { ResultContext } from "../../context/ResultsContext";

export interface card {
  id: number;
  name: string;
  url: string;
}

export const Game = () => {
  let dataArray: card[] = [];
  const [cards, setCards] = useState<card[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const { setGames } = useContext(ResultContext);

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

  const createGaymBoard = async () => {
    for (let i = 0; i < 4; i++) {
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

  const createCard = async (seed: string, id: number) => {
    try {
      let result = await GetAvatar({ seed });
      dataArray.push({ id, name: seed, url: result });
    } catch (error) {
      console.log("Error fetching avatar:", error);
      throw error;
    }
  };

  const handleFindDuplicates = (index: number) => {
    console.log("clicked");
    if (openedCards.length === 1) {
      setOpenedCards((prev) => [...prev, index]);
      // evaluate();
    } else {
      setOpenedCards([index]);
    }
  };

  const evaluate = () => {
    const [first, second] = openedCards;
    if (cards[first].id === cards[second].id) {
      console.log("Совпало");
      setClearedCards((prev) => [...prev, first]);
      setOpenedCards([]);

      // checkCompletion();
    }
  };

  const checkCompletion = () => {
    if (clearedCards.length * 2 === cards.length) {
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

  useEffect(() => {
    if (clearedCards.length > 0) {
      checkCompletion();
    }
  }, [clearedCards]);

  useEffect(() => {
    if (openedCards.length === 2) {
      evaluate();
    }
  }, [openedCards]);

  return (
    <div>
      <button onClick={createGaymBoard}>knopochka</button>
      {cards.map((item, index) => (

        <img
          onClick={() => handleFindDuplicates(index)}
          key={index}
          src={item.url}
          alt="none"
        />
      ))}
    </div>
  );
};
