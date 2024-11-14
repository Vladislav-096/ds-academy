import "./styles/fonts.scss";
import "./styles/_variables.scss";
import "./styles/common.scss";
import { Layout } from "./Components/Layout/Layout";
import { useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

export function App() {
  const [theme, setTheme] = useState<string>("light");

  const updateTheme = (updatedTheme: string) => {
    setTheme(updatedTheme);
  };

  useEffect(() => {
    // Функция для определения предпочтений пользователя по теме
    const getSystemTheme = () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    // Устанавливаем начальную тему
    setTheme(getSystemTheme());

    // Добавляем слушатель изменения темы у пользователя
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQueryList.addEventListener("change", handleChange);

    // Очистка слушателя при размонтировании компонента
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      <Layout />;
    </ThemeContext.Provider>
  );
}
