import Navbar from "./Navbar";
import useWindowSize from "./hooks/useWindowSize";
import { FaLaptop } from "react-icons/fa";
import { FaTabletAlt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";

const Header = ({ title }) => {
  const windowSize = useWindowSize();
  return (
    <header>
      <div>
        <h2>{title}</h2>
        <div className="windowsize">
          {windowSize.width < 600 ? (
            <FaMobileAlt />
          ) : windowSize.width < 768 ? (
            <FaTabletAlt />
          ) : (
            <FaLaptop />
          )}
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
