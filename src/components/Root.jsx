import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./partials/Header";

import Footer from "./partials/Footer";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="loading loading-bars loading-xs sm:loading-sm md:loading-md lg:loading-lg"></span>
    </div>
  );
};

const Root = () => {
  return (
    <div className="">
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Root;
