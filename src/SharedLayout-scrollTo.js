import { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  const mainRef = useRef();
  useEffect(() => {
    console.log(mainRef);
    if (mainRef.current !== undefined) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  console.log("Shared Layout being rendered ...");
  return (
    <div className="App">
      <Header
        title={process.env.REACT_APP_HEADER_CAPTION || "React Blog Full Stack"}
      />
      <div ref={mainRef} className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default SharedLayout;
