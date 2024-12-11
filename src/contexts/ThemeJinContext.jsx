import { createContext, useEffect, useState } from "react";

export const ThemeJinContext = createContext();
export const ThemeJinProvider = ({ children }) => {
  const [theme, setTheme] = useState("green");
  useEffect(() => {
    const nowTheme = localStorage.getItem("theme");
    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.setItem("themes", JSON.stringify(theme));
    }
  }, []);
  return (
    <ThemeJinContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeJinContext.Provider>
  );
};
