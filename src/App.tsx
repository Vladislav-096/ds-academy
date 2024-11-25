import "./styles/fonts.scss";
import "./styles/_variables.scss";
import "./styles/common.scss";
import { useEffect, useState } from "react";
import { Result, ResultContext } from "./context/ResultsContext";
import {
  currentSessionResult,
  SessionResultContext,
} from "./context/SessionResultContext";
import { Settings, SettingsContext } from "./context/SettingsContext";
import { Layout } from "./components/Layout/Layout";

export function App() {
  const [games, setGames] = useState<Result[]>([]);
  const [result, setResult] = useState<currentSessionResult | null>(null);
  const [settings, setSettings] = useState<Settings | null>({
    difficulty: "Easy",
    duration: 300000,
    mistakesLimit: 30,
    fieldSize: 8,
  });

  useEffect(() => {
    const gamesResultData = localStorage.getItem("games");
    const currentResults = sessionStorage.getItem("result");
    const gameSettings = localStorage.getItem("settings");

    if (gamesResultData) {
      setGames(JSON.parse(gamesResultData));
    }

    if (currentResults) {
      setResult(JSON.parse(currentResults));
    }

    if (gameSettings) {
      setSettings(JSON.parse(gameSettings));
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

  const updateSettings = (newSettings: Settings | null) => {
    setSettings(newSettings);
    if (newSettings) {
      localStorage.setItem("settings", JSON.stringify(newSettings));
    } else {
      console.log("Ошибка при получении объекта настроек");
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings: updateSettings }}>
      <ResultContext.Provider value={{ games, setGames: updateGamesResult }}>
        <SessionResultContext.Provider
          value={{ result, setResult: updateCurrentSessionResult }}
        >
          <Layout />
        </SessionResultContext.Provider>
      </ResultContext.Provider>
    </SettingsContext.Provider>
  );
}
