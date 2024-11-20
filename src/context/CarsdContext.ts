import { createContext } from "react";

export interface card {
  id: number;
  name: string;
  url: string;
}

interface CardsContext {
  cards: card[];
  setCards: (cards: card[]) => void;
}

export const CardsContext = createContext<CardsContext>({
  cards: [],
  setCards: () => {},
});
