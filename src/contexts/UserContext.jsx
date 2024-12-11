import { createContext, useEffect, useState } from "react";
// 1. context 생성하기
export const UserContext = createContext();
const LS_LOGIN = "login";

export const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const handleChange = flag => {
    setLogin(flag);
    localStorage.setItem(LS_LOGIN, JSON.stringify(flag));
  };
  useEffect(() => {
    const flag = localStorage.getItem(LS_LOGIN);
    if (flag) {
      setLogin(JSON.parse(flag));
    } else {
      localStorage.setItem(LS_LOGIN, JSON.stringify(false));
    }
  }, []);
  return (
    <UserContext.Provider value={{ login, handleChange }}>
      {children}
    </UserContext.Provider>
  );
};
