import { createContext } from "react";

export interface Result {
  result: boolean;
  reason: string;
  date: Date;
  duration: number;
  mistakesCount: number;
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
