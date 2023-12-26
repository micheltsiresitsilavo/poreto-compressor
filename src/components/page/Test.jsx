import { filesize } from "filesize";
import { motion } from "framer-motion";
import useGetData from "../../hook/useGetData";
import { useDownload } from "../../hook/useDownload";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Engine from "./Engine";
dayjs.extend(relativeTime);

const Test = () => {
  const endPoint = import.meta.env.VITE_BASE_URL;

  const { data, isLoading } = useGetData();
  const { handleZip } = useDownload();

  const ziper = async () => {
    const images = data?.map((item) => {
      return {
        file: item.data,
        fileName: item.name,
        extesion: item.extension,
      };
    });

    handleZip(images);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xs sm:loading-sm md:loading-md lg:loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-1 space-y-2 space-x-2 ">
      <div className="h-auto order-last md:order-first  max-w-3xl bg-gray-100 dark:bg-gray-800 shadow-xl py-1  rounded-lg ">
        <div className="px-2 border-b border-warning py-2">
          <button className="btn btn-warning btn-md" onClick={() => ziper()}>
            Download all ({data?.length} files)
          </button>
        </div>
        <div className="flex-col">
          {data
            ?.map((item) => (
              <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ stiffness: 130, duration: 1.5 }}
                key={item.id}
                className="py-4 px-4 flex-col space-y-2 items-center   border-b border-slate-600 -z-100"
              >
                <div className="flex justify-start items-center space-x-2">
                  <div className="w-20 h-auto  rounded-md">
                    <img
                      src={`${endPoint}/api/files/${item.collectionId}/${item.imagesId}/${item.fileName}`}
                      className="rounded-md"
                    />
                  </div>
                  <div className="text-sm overflow-hidden">
                    <p>
                      <span className="text-warning font-semibold">Name: </span>
                      {item.name}
                    </p>
                    <p>
                      <span className="text-warning font-semibold">Size: </span>
                      {filesize(item.size, { standard: "jedec" })}
                    </p>
                    {item.isRemote ? (
                      <p>
                        <span className="text-warning font-semibold">
                          From:{" "}
                        </span>
                        {item.remote}
                      </p>
                    ) : (
                      ""
                    )}
                    <p>
                      <span className="text-warning font-semibold">Time: </span>
                      {dayjs(item.created).fromNow()}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => saveAs(item.data, `poreto_${item.name}`)}
                  >
                    Download
                  </button>
                </div>
              </motion.div>
            ))
            .reverse()
            .slice(0, 5)}
        </div>
        {data?.length > 6 ? (
          <div className="py-2 px-2 text-end">
            <Link
              to="/all"
              className="btn btn-warning btn-md hover:shadow-xl shadow-md"
            >
              See all
            </Link>
          </div>
        ) : (
          ""
        )}
        {!data || data?.length === 0 ? (
          <div className="flex justify-center items-center  lg:h-3/4 h-auto py-4 lg:py-0">
            <div className="md:px-8 md:py-8 border border-yellow-400 px-4 py-4 ">
              <p> Upload your images</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Engine />
    </div>
  );
};

export default Test;
