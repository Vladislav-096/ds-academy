import { createContext } from "react";

export interface currentSessionResult {
  amountOfGames: number;
  maxScore: number;
}

export interface SessionResultContext {
  result: currentSessionResult | null;
  setResult: (result: currentSessionResult | null) => void;
}

export const SessionResultContext = createContext<SessionResultContext>({
  result: null,
  setResult: () => {},
});
