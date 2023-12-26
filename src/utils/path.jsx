import Root from "../components/Root";
import About from "../components/page/About";
import AllPage from "../components/page/AllPage";
import Compare from "../components/page/Compare";
import Home from "../components/page/Home";

import ErrorPage from "../components/partials/ErrorPage";

const path = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "all",
        element: <AllPage />,
      },
      {
        path: "compare",
        element: <Compare />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

export default path;
