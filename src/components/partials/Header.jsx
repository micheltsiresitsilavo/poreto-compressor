import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [breakPoint, setBreakPoint] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      let wSizeWin = window.innerWidth;
      setBreakPoint(wSizeWin);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="navbar bg-base-100/30 sticky top-0 z-40 backdrop-filter backdrop-blur-lg border-b border-warning ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="navbar-start sm:invisible"
      >
        <Link
          to="/"
          className="text-lg md:text-2xl text-slate-100 font-semibold flex space-x-1 items-center"
        >
          Poreto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="#ffbe00"
          >
            <path d="M18.5 11c-4.136 0-7.5 3.364-7.5 7.5 0 .871.157 1.704.432 2.482l9.551-9.551A7.462 7.462 0 0 0 18.5 11z"></path>
            <path d="M12 2C6.486 2 2 6.486 2 12c0 4.583 3.158 8.585 7.563 9.69A9.431 9.431 0 0 1 9 18.5C9 13.262 13.262 9 18.5 9c1.12 0 2.191.205 3.19.563C20.585 5.158 16.583 2 12 2z"></path>
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="navbar-center invisible sm:visible"
      >
        <Link
          to="/"
          className="text-lg md:text-2xl text-slate-100 font-semibold flex space-x-1 items-center"
        >
          Poreto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="#ffbe00"
          >
            <path d="M18.5 11c-4.136 0-7.5 3.364-7.5 7.5 0 .871.157 1.704.432 2.482l9.551-9.551A7.462 7.462 0 0 0 18.5 11z"></path>
            <path d="M12 2C6.486 2 2 6.486 2 12c0 4.583 3.158 8.585 7.563 9.69A9.431 9.431 0 0 1 9 18.5C9 13.262 13.262 9 18.5 9c1.12 0 2.191.205 3.19.563C20.585 5.158 16.583 2 12 2z"></path>
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="navbar-end gap-2"
      >
        <>
          <Link to="/all" className="btn btn-warning btn-md ">
            {breakPoint <= 623 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="m21.484 7.125-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749z"></path>
                <path d="m12 15.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 15.856z"></path>
                <path d="m12 19.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 19.856z"></path>
              </svg>
            ) : (
              "List all images"
            )}
          </Link>
          <Link to="/about" className="btn btn-warning btn-md ">
            {breakPoint <= 623 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zm8-12v8h8V3zm6 6h-4V5h4zm-5.99 4h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2zm2-6h2v2h-2zm2 2h2v2h-2z"></path>
              </svg>
            ) : (
              "About"
            )}
          </Link>
        </>
      </motion.div>
    </div>
  );
};

export default Header;
