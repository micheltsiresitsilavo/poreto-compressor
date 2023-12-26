import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Theme } from "react-daisyui";

import path from "./utils/path";

const router = createBrowserRouter(path);

function App() {
  return (
    <Theme dataTheme="dark">
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
