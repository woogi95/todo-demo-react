import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { ThemeJinContext } from "../../contexts/ThemeJinContext";
import { FaHeartCircleCheck } from "react-icons/fa6";

const Header = () => {
  const { login, handleChange } = useContext(UserContext);
  const { handleTheme } = useContext(ThemeJinContext);

  return (
    <header>
      <Link to={"/"} style={{ color: "red" }}>
        <FaHeartCircleCheck />
        Home
      </Link>
      <Link to={"/"}>About </Link>
      <Link to={"/todo"}>Todo </Link>
      <button onClick={() => handleChange(login)}>
        {login === false ? "로그인" : "로그아웃"}
      </button>
      <button onClick={() => handleTheme()}>테마 변경</button>
    </header>
  );
};
export default Header;
