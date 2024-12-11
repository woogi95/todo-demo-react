import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
// 1. context 생성하기
export const UserContext = createContext();
const LS_LOGIN = "login";
const LS_JIN_COOKIE = "jincookie";
const LS_LOGIN_SS = "login_ss";

export const UserProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies([LS_JIN_COOKIE]);
  const [login, setLogin] = useState(false);
  const handleChange = flag => {
    setLogin(!flag);
    localStorage.setItem(LS_LOGIN, JSON.stringify(!flag));
    sessionStorage.setItem(LS_LOGIN_SS, JSON.stringify(!flag));
    //쿠키
    setCookie(LS_JIN_COOKIE, !flag, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };
  useEffect(() => {
    const flag = localStorage.getItem(LS_LOGIN);
    const flagSs = sessionStorage.getItem(LS_LOGIN_SS);
    const flagCookie = cookies[LS_JIN_COOKIE];
    if (flag) {
      setLogin(JSON.parse(flag));
    } else {
      localStorage.setItem(LS_LOGIN, JSON.stringify(false));
    }
    //쿠키
    if (flagCookie) {
      setLogin(flagCookie);
    } else {
      setCookie(LS_JIN_COOKIE, false, {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
    // 로컬
    if (flagSs) {
      setLogin(JSON.parse(flagSs));
    } else {
      sessionStorage.setItem(LS_LOGIN_SS, JSON.stringify(false));
    }
  }, []);
  return (
    <UserContext.Provider value={{ login, handleChange }}>
      {children}
    </UserContext.Provider>
  );
};
