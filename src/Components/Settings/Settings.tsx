import { useContext, useEffect, useState } from "react";
import { GetAvatar } from "../../api/getAvatar";
import { card, CardsContext } from "../../context/CarsdContext";

export const Settings = () => {
  // const [cards, setCards] = useState<card[]>([]);
  const { cards, setCards } = useContext(CardsContext);
  console.log("cards in settings", cards);

  const getAvatar = async (seed: string, id: number) => {
    try {
      let result = await GetAvatar({ seed });
      setCards([{ id: id, name: seed, url: result }]);
    } catch (error) {
      console.log("Error fetching avatar:", error);
      throw error;
    }
  };

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

  const shuffleCards = (arr: card[]) => {
    for (let i = 0; i < arr.length; i++) {
      let j = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    setCards(arr);
  };

  const handleClick = async () => {
    setCards([]);
    for (let i = 0; i < 4; i++) {
      await getAvatar(generateRandomString(), i);
    }

    shuffleCards(cards.concat(cards));
  };

  return (
    <div>
      <button onClick={handleClick}>Create array</button>
    </div>
  );
};
