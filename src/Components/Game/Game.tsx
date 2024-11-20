import { useContext, useState } from "react";
import { card, CardsContext } from "../../context/CarsdContext";

export const Game = () => {
  const { cards } = useContext(CardsContext);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  console.log(cards);

  const handleClick = (index: number) => {
    if (openedCards.length === 1) {
      setOpenedCards((prev) => [...prev, index]);
    } else {
      setOpenedCards([index]);
    }
  };



  return (
    <div>
      {shuffleCards(cards.concat(cards)).map((item, index) => (
        <img
          key={index}
          onClick={() => handleClick(index)}
          src={item.url}
          alt="none"
        />
      ))}
    </div>
  );
};
