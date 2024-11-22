import { createContext } from "react";

export interface Result {
  date: Date;
  duration: number;
  mistakesCount: string;
  difficulty: string;
  score: number;
}

export interface ResultContext {
  games: Result[];
  setGames: (games: Result) => void;
}

export const ResultContext = createContext<ResultContext>({
  games: [],
  setGames: () => {},
});
