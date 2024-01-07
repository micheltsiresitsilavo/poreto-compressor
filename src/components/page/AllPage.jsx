import useGetAll from "../../hook/useGetAll";
import { Toaster } from "react-hot-toast";
import ModalDeleteApp from "./modale/ModaleDelete";
import { motion } from "framer-motion";
import ModalDeleteAll from "./modale/ModaleDeleteAll";

import { saveAs } from "file-saver";

const AllPage = () => {
  const endPoint = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useGetAll();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xs sm:loading-sm md:loading-md lg:loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className={data?.length > 3 ? "h-auto mb-6" : "h-screen mb-6"}>
        <div className="px-3 py-4 flex justify-between border-b mb-4 border-yellow-200">
          <p className="text-slate-100 font-bold text-2xl">All Images</p>
          {data?.length != 0 ? (
            <div>
              <ModalDeleteAll dataToDelete={data} />
            </div>
          ) : (
            ""
          )}
        </div>
        {data?.length != 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-1  sm:grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-4  "
          >
            {data?.map((item, key) => {
              return (
                <div
                  key={item.id}
                  className="bg-slate-700  py-2 w-auto rounded-sm relative"
                >
                  {item?.images.length === 1 ? (
                    <div>
                      <div className="w-full flex justify-center ">
                        <img
                          src={`${endPoint}/api/files/${item.collectionId}/${item.id}/${item.images[0]}`}
                          className="md:w-44 sm:w-32 w-24 px-2 py-4"
                        />
                      </div>
                      <div className="flex absolute bottom-0 text-center font-bold justify-around items-center w-full">
                        <div
                          className="bg-warning text-slate-700 w-full flex justify-center items-center px-2 cursor-pointer"
                          onClick={() =>
                            saveAs(
                              `${endPoint}/api/files/${item.collectionId}/${item.id}/${item.images[0]}`,
                              item.images[key]
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 "
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                            <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                          </svg>
                        </div>
                        {/* <ModalDeleteApp imageId={item.id} /> */}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 space-y-1 sm:grid-cols-4 space-x-2 items-center">
                      {item.images.map((image) => (
                        <div key={item.id} className="relative">
                          <img
                            src={`${endPoint}/api/files/${item.collectionId}/${item.id}/${image}`}
                            className="md:w-24 w-16  px-2 py-4"
                          />
                          <div className="flex absolute bottom-0 text-center font-bold justify-around items-center w-full mt-2">
                            <div
                              className="bg-warning text-slate-700 w-full flex justify-center items-center px-2 cursor-pointer"
                              onClick={() =>
                                saveAs(
                                  `${endPoint}/api/files/${item.collectionId}/${item.id}/${image}`,
                                  `poreto_${image}`
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="absolute top-0 left-0">
                    <ModalDeleteApp imageId={item.id} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <div className="h-screen w-full flex justify-center items-center ">
            <div className="md:px-8 md:py-8 border border-yellow-400 px-4 py-4">
              Empty Images
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default AllPage;
