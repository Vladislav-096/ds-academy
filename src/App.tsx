import { Layout } from "./components/Layout/Layout";
import "./styles/fonts.scss";
import "./styles/_variables.scss";
import "./styles/common.scss";
import { useEffect, useState } from "react";
import { Result, ResultContext } from "./context/ResultsContext";

export function App() {
  const [games, setGames] = useState<Result | null>(null);

  useEffect(() => {
    const gamesResultData = localStorage.getItem("games");
    if (gamesResultData) {
      setGames(JSON.parse(gamesResultData));
    }
  }, []);

  const updateGamesResult = (newGameData: Result | null) => {
    setGames(newGameData);
    if (newGameData) {
      localStorage.setItem("games", JSON.stringify(newGameData));
    } else {
      console.log("Ошибка при получении результатов");
    }
  };

  return (
    <ResultContext.Provider value={{ games, setGames: updateGamesResult }}>
      <Layout />;
    </ResultContext.Provider>
  );
}
