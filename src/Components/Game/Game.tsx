import { useEffect, useState } from "react";
import { GetAvatar } from "../../api/getAvatar";

interface cards {
  id: number;
  name: string;
  url: string;
}

export const Game = () => {
  const [cards, setCards] = useState<cards[]>([]);

  // for (let j = 0; j < array.length; j++) {
  //   let k = Math.floor(Math.random() * array.length);
  //   let temp = array[j];
  //   array[j] = array[k];
  //   array[k] = temp;
  // }
  // console.log("state", state);

  const getAvatar = async (seed: string, id: number) => {
    try {
      let result = await GetAvatar({ seed });
      setCards((prev) => [...prev, { id: id, name: seed, url: result }]);
      console.log(cards);
    } catch (error) {
      console.log("Error fetching avatar:", error);
      throw error;
    }
  };

  function generateRandomString() {
    let length = 10;
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      (async () => {
        await getAvatar(generateRandomString(), i);
      })();
    }
  }, []);

  return (
    <div>
      {cards.map((item) => (
        <img src={item.url} alt="none" />
      ))}
    </div>
  );
};
