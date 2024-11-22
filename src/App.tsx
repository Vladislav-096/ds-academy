import { Layout } from "./components/Layout/Layout";
import "./styles/fonts.scss";
import "./styles/_variables.scss";
import "./styles/common.scss";
import { useEffect, useState } from "react";
import { Result, ResultContext } from "./context/ResultsContext";
import {
  currentSessionResult,
  SessionResultContext,
} from "./context/SessionResultContext";

export function App() {
  const [games, setGames] = useState<Result[]>([]);
  const [result, setResult] = useState<currentSessionResult | null>(null);

  useEffect(() => {
    const gamesResultData = localStorage.getItem("games");
    const currentResults = sessionStorage.getItem("result");

    if (gamesResultData) {
      setGames(JSON.parse(gamesResultData));
    }

    if (currentResults) {
      setResult(JSON.parse(currentResults));
    }
  }, []);

  const updateGamesResult = (gameData: Result) => {
    if (gameData) {
      const newGameData = [...games, gameData];
      setGames(newGameData);
      localStorage.setItem("games", JSON.stringify(newGameData));
    } else {
      console.log("Ошибка при получении результатов");
    }
  };

  const updateCurrentSessionResult = (
    newResult: currentSessionResult | null
  ) => {
    setResult(newResult);
    if (newResult) {
      sessionStorage.setItem("result", JSON.stringify(newResult));
    } else {
      console.log("Ошибка при получении текущего результата");
    }
  };

  return (
    <ResultContext.Provider value={{ games, setGames: updateGamesResult }}>
      <SessionResultContext.Provider
        value={{ result, setResult: updateCurrentSessionResult }}
      >
        <Layout />;
      </SessionResultContext.Provider>
    </ResultContext.Provider>
  );
}
