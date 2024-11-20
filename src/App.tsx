import { Layout } from "./components/Layout/Layout";
import "./styles/fonts.scss";
import "./styles/_variables.scss";
import "./styles/common.scss";
import { useState } from "react";
import { card, CardsContext } from "./context/CarsdContext";

export function App() {
  const [cards, setCards] = useState<card[]>([]);

  const updateCards = (card: card[]) => {
    if (card.length === 0) {
      setCards([]);
    } else {
      setCards((prev) => [...prev, ...card]);
    }
  };

  return (
    <CardsContext.Provider value={{ cards, setCards: updateCards }}>
      <Layout />;
    </CardsContext.Provider>
  );
}
