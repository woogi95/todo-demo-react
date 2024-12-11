import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const ThemeJinContext = createContext();
const LS_THEME_COOKIE = "themecookie";
export const ThemeJinProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies([LS_THEME_COOKIE]);
  const [theme, setTheme] = useState("green");
  const handleTheme = () => {
    const nowTheme = theme === "green" ? "hotpink" : "green";
    setTheme(nowTheme);
    localStorage.setItem("theme", JSON.stringify(nowTheme));
    setCookie(LS_THEME_COOKIE, theme, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    const nowTheme = localStorage.getItem("theme");
    const nowThemeCookie = cookies[LS_THEME_COOKIE];
    if (nowThemeCookie) {
      setTheme(nowThemeCookie);
    } else {
      setCookie(LS_THEME_COOKIE, theme, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }

    if (nowTheme) {
      setTheme(JSON.parse(nowTheme));
    } else {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  }, []);
  return (
    <ThemeJinContext.Provider value={{ theme, setTheme, handleTheme }}>
      {children}
    </ThemeJinContext.Provider>
  );
};
