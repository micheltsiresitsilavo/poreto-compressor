import useSWR from "swr";
import localforage from "localforage";
import { deleteData } from "../store/store";
import pb from "../utils/pbClient";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const useGetData = () => {
  const getData = async () => {
    const data = await localforage.getItem("data");
    if (data) {
      for (const image of data) {
        const delayImage = dayjs(image.created).toNow(true);
        const strResp = delayImage.includes("weeks");
        if (strResp) {
          await pb.collection("medias").delete(image.imagesId);
          deleteData(image.imagesId);
          console.log("Image Deleted");
        }
      }
      return data;
    }
  };
  return useSWR("getData2", getData);
};

export default useGetData;
