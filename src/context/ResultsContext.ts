import { createContext } from "react";

export interface Result {
  date: Date;
  duration: string;
  mistakesCount: string;
  difficulty: string;
  score: string;
}

export interface ResultContext {
  games: Result | null;
  setGames: (games: Result | null) => void;
}

export const ResultContext = createContext<ResultContext>({
  games: null,
  setGames: () => {},
});
