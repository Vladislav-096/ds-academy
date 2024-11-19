import { Route, Routes } from "react-router-dom";
import { PlayingField } from "../../pages/PlayingField/PlayingField";
import { SettingsPage } from "../../pages/SettingsPage/SettingsPage";
import { ResultsPage } from "../../pages/ResultsPage/ResultsPage";

export const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/game" element={<PlayingField />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </main>
  );
};
