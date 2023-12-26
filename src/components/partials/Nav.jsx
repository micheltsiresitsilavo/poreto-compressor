import { NavLink } from "react-router-dom";
const Nav = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-primary text-base-200 dark:text-slate-100 dark:font-semibold"
          : ""
      }
    >
      {children}
    </NavLink>
  );
};

const NavMe = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "px-2 py-1 border-b-2 md:border-l-4 md:border-b-0 md:py-3 dark:border-green-400 dark:text-green-400 "
          : "p-2 border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-300 dark:text-gray-400"
      }
    >
      {children}
    </NavLink>
  );
};

const NavBtn = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          : "self-center px-8 py-3 rounded"
      }
    >
      {children}
    </NavLink>
  );
};

const NavGrp = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "tab tab-active" : "tab ")}
    >
      {children}
    </NavLink>
  );
};

const LinkActv = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-primary text-slate-100 px-4 rounded-md py-1 font-semibold cursor-pointer  lg:visible invisible "
          : " bg-slate-500 text-slate-200 px-4 rounded-md py-1 font-semibold cursor-pointer lg:visible invisible  "
      }
    >
      {children}
    </NavLink>
  );
};

const LinkSideBar = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-slate-700 "
          : " group relative flex justify-center rounded px-2 py-1.5 text-slate-100 hover:bg-gray-50 hover:text-gray-700  "
      }
    >
      {children}
    </NavLink>
  );
};

export { Nav, LinkActv, NavBtn, NavGrp, NavMe, LinkSideBar };
