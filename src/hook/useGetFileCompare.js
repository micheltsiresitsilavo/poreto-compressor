import localforage from "localforage";
import useSWR from "swr";
import pb from "../utils/pbClient";

const useGetFileCompare = () => {
  const getFile = async () => {
    const fileOrgID = await localforage.getItem("fileOrgID");
    if (fileOrgID) {
      const resImage = await pb.collection("compare").getOne(fileOrgID);
      const fileCompSize = await localforage.getItem("fileCompSize");
      const fileOrgSize = await localforage.getItem("fileOrgSize");

      const compressRatio = (100 - (fileCompSize / fileOrgSize) * 100).toFixed(
        1
      );

      return {
        fileCompSize,
        fileOrgSize,
        resImage,
        compressRatio,
      };
    }
    return {
      fileCompSize: 0,
      fileOrgSize: 0,
      resImage: null,
      compressRatio: 0,
    };
  };

  return useSWR("getFileToCompare", getFile);
};

export default useGetFileCompare;
