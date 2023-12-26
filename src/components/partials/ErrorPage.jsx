import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-800">
      <h1 className="uppercase tracking-widest text-gray-500 dark:text-warning">
        404 | Not Found
      </h1>
    </div>
  );
};

export default ErrorPage;
