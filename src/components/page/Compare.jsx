import Uppy from "@uppy/core";
import { filesize } from "filesize";

import Webcam from "@uppy/webcam";
import { Dashboard, ProgressBar } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import Compressor from "@uppy/compressor";
import Informer from "@uppy/informer";
import { motion } from "framer-motion";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/informer/dist/style.min.css";

import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";

import localforage from "localforage";
import useGetFileCompare from "../../hook/useGetFileCompare";
import pb from "../../utils/pbClient";

const Compare = () => {
  const endPoint = import.meta.env.VITE_BASE_URL;
  const { mutate } = useSWRConfig();

  const { data } = useGetFileCompare();

  //Uppy
  const compareUppy = new Uppy({
    allowMultipleUploads: false,
    onBeforeFileAdded: (currentFile) => {
      (async () => {
        const fileOrgID = await localforage.getItem("fileOrgID");
        if (fileOrgID) {
          await pb.collection("compare").delete(fileOrgID);
          const fileOrginale = await pb
            .collection("compare")
            .create({ imageOrginale: currentFile.data });
          await localforage.setItem("fileOrgID", fileOrginale.id);
          await localforage.setItem("fileOrgSize", currentFile.size);
          // mutate("getFileToCompare");
        }
        console.log("tay 2");
        console.log(currentFile.data);
        const fileOrginale = await pb
          .collection("compare")
          .create({ imageOrginale: currentFile.data });
        await localforage.setItem("fileOrgID", fileOrginale.id);
        await localforage.setItem("fileOrgSize", currentFile.size);
        // mutate("getFileToCompare");
      })();
    },
    restrictions: {
      // maxFileSize: 50000000,
      allowedFileTypes: [".jpg", ".png", ".webp", "gif"],
    },
  })
    .use(Webcam)
    .use(Compressor, {
      id: "compressor",
      quality: 0.4,
    })
    .use(ImageEditor, {
      quality: 0.7,
    })
    .use(Informer, { id: "Informer" })

    .on("complete", async (result) => {
      const data = result.successful;
      const fileOrgID = await localforage.getItem("fileOrgID");

      await pb.collection("compare").update(fileOrgID, {
        imageCompressed: data[0].data,
      });

      await localforage.setItem("fileCompSize", data[0].size);
      mutate("getFileToCompare");
    });

  const [widthDash, setWidthDash] = useState(600);
  useEffect(() => {
    const handleWindowResize = () => {
      let wSizeWin = window.innerWidth;
      if (wSizeWin <= 629) {
        setWidthDash(400);
      } else {
        setWidthDash(600);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      {data?.compressRatio ? (
        <div className="text-xl py-4 flex justify-center items-center">
          <p>
            Compress Ratio:{" "}
            <span className="text-warning"> -{data?.compressRatio}% </span>
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-center items-center h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 py-4 px-2 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <div className="">
              <Dashboard
                uppy={compareUppy}
                plugins={["Webcam", "ImageEditor", "Compressor"]}
                width={widthDash} //600 629
                height={340}
                showProgressDetails={true}
                theme="auto"
              />
              <ProgressBar uppy={compareUppy} hideAfterFinish={false} />
              <div id="informer"></div>
            </div>
          </motion.div>{" "}
          <div className="px-2 md:px-0 ">
            {!data?.fileOrgSize && !data?.fileCompSize ? (
              <div className="diff aspect-[16/9] px-4 rounded-md border border-warning py-2 ">
                <div className="diff-item-1 ">
                  <div className="  bg-warning text-primary-content text-9xl font-black grid place-content-center ">
                    WOZ
                  </div>
                </div>
                <div className="diff-item-2">
                  <div className="bg-base-200 text-9xl font-black grid place-content-center">
                    WOZ
                  </div>
                </div>
                <div className="diff-resizer"></div>
              </div>
            ) : (
              <div className="diff aspect-[16/9] px-4 rounded-md border border-warning py-2 ">
                <div className="diff-item-1 relative">
                  <img
                    src={`${endPoint}/api/files/${data?.resImage?.collectionId}/${data?.resImage?.id}/${data?.resImage?.imageOrginale}`}
                  />
                  <div className=" text-center bg-gray-800/80 px-4 text-xl py-2 absolute font-bold text-red-500  rounded-md  w-32 h-12 ">
                    {filesize(data?.fileOrgSize, { standard: "jedec" })}
                  </div>
                </div>
                <div className="diff-item-2 relative">
                  <img
                    src={`${endPoint}/api/files/${data?.resImage?.collectionId}/${data?.resImage?.id}/${data?.resImage?.imageCompressed}`}
                  />
                  <div className="bg-gray-800/80 px-4 text-xl py-2 absolute font-bold text-warning  rounded-md   w-32 h-12">
                    {filesize(data?.fileCompSize, { standard: "jedec" })}
                  </div>
                </div>
                <div className="diff-resizer"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
