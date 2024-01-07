import Uppy from "@uppy/core";
import toast, { Toaster } from "react-hot-toast";
import Webcam from "@uppy/webcam";
import { Dashboard, ProgressBar } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import Compressor from "@uppy/compressor";
import Informer from "@uppy/informer";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/informer/dist/style.min.css";

import { motion } from "framer-motion";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { addData, stateStore } from "../../store/store";
import pb from "../../utils/pbClient";
import { useSnapshot } from "valtio";

const Engine = () => {
  const { mutate } = useSWRConfig();
  const { deviceID } = useSnapshot(stateStore);

  const addImages = async (blobData, file) => {
    const refreshCache = async () => {
      if (file.length === 1) {
        const resp = await pb.collection("medias").create({
          images: blobData,
          deviceID,
        });

        const blobPlusFileName = blobData.map((it, key) => {
          return { file: it, fileName: resp.images[key] };
        });

        await addData(
          file,
          blobPlusFileName,
          resp.collectionId,
          resp.id,
          resp.images[0],
          resp.created
        );
        return mutate("getData2");
      }
      const resp = await pb.collection("medias").create({
        images: blobData,
        isMultiple: true,
        deviceID,
      });

      const blobPlusFileName = blobData.map((it, key) => {
        return { file: it, fileName: resp.images[key] };
      });

      await addData(
        file,
        blobPlusFileName,
        resp.collectionId,
        resp.id,
        resp.created
      );
      mutate("getData2");
    };

    toast.promise(refreshCache(), {
      loading: "Loading",
      success: () => {
        mutate("getAllData");

        return "Image compressed successfuly!";
      },
      error: () => {
        return "Error when deleting";
      },
    });
  };

  const uppy = new Uppy({
    allowMultipleUploads: true,
    restrictions: {
      allowedFileTypes: [".jpg", ".png", ".webp", "gif"],
    },
  })
    .use(Webcam)
    .use(Compressor, {
      id: "compressor",
      quality: 0.4,
    })
    .use(ImageEditor, {
      quality: 0.4,
    })

    .use(Informer, { id: "Informer" })
    .on("complete", (result) => {
      const data = result.successful;
      const blobData = data.map((item) => item.data);

      addImages(blobData, data);
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className=" "
      >
        <div className="">
          <Dashboard
            uppy={uppy}
            plugins={["Webcam", "ImageEditor", "Compressor"]}
            width={widthDash}
            height={500}
            showProgressDetails={true}
            theme="auto"
            note="Nb: Duplicate image remove automaticaly in this list"
            bundle={true}
          />
          <ProgressBar uppy={uppy} hideAfterFinish={false} />
          <div id="informer"></div>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};

export default Engine;
