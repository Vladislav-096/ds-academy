import { createContext } from "react";

interface ThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContext>({
  theme: "light",
  setTheme: () => {},
});
