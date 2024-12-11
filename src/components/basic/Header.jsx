import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { ThemeJinContext } from "../../contexts/ThemeJinContext";

const Header = () => {
  const { login, handleChange } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeJinContext);

  return (
    <header>
      <Link to={"/"}>Home </Link>
      <Link to={"/"}>About </Link>
      <Link to={"/todo"}>Todo </Link>
      <button onClick={() => handleChange()}>
        {login === false ? "로그인" : "로그아웃"}
      </button>
      <button
        onClick={() => {
          const nowTheme = theme === "green" ? "hotpink" : "green";
          setTheme(nowTheme);
          localStorage.setItem("theme", JSON.stringify(nowTheme));
        }}
      >
        테마 변경
      </button>
    </header>
  );
};
export default Header;
