import { useContext } from "react";
import Footer from "./basic/Footer";
import Header from "./basic/Header";
import { ThemeJinContext } from "../contexts/ThemeJinContext";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeJinContext);
  return (
    <div style={{ backgroundColor: `${theme}` }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
