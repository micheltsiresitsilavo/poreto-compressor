import { Link } from "react-router-dom";
import Test from "./Test";
import { TypeAnimation } from "react-type-animation";
const Home = () => {
  return (
    <div className="h-auto">
      <section className="bg-[url('./image/World_Map.svg')] bg-cover bg-center ">
        <div className="w-full text-warning bg-gray-800/90  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Compress your file for free
              </h2>
              <p className="text-3xl font-bold sm:text-4xl">
                <TypeAnimation
                  sequence={[
                    "jpeg",
                    1000,
                    "png",
                    1000,
                    "webp",
                    1000,
                    "gif",
                    1000,
                  ]}
                  speed={20}
                  style={{ fontSize: "1em" }}
                  repeat={Infinity}
                />
              </p>
              <p className="mt-4 text-slate-100">
                Optimize your images effortlessly for free, offering
                high-quality compression without any compromise on visuals.And
                Transform your images , all-in-one software that combines
                powerful editing tools and efficient compression technology for
                optimal visual results.
              </p>

              <Link to="/compare" className="btn btn-warning btn-md mt-6">
                Test to see
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="px-2 py-8">
        <Test />
      </div>
    </div>
  );
};

export default Home;
