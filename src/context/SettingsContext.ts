import { createContext } from "react";

export interface Settings {
  difficulty: string;
  duration: number;
  mistakesLimit: number;
  fieldSize: number;
}

export interface SettingsContext {
  settings: Settings | null;
  setSettings: (settings: Settings | null) => void;
}

export const SettingsContext = createContext<SettingsContext>({
  settings: null,
  setSettings: () => {},
});
