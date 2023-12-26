import useSWR from "swr";
import pb from "../utils/pbClient";
import { useSnapshot } from "valtio";
import { stateStore } from "../store/store";
const useGetAll = () => {
  const { deviceID } = useSnapshot(stateStore);
  const getAllData = async () => {
    const allData = await pb.collection("medias").getFullList();
    const dataDeviceID = allData.filter((item) => item.deviceID === deviceID);
    return dataDeviceID;
  };

  return useSWR("getAllData", getAllData);
};

export default useGetAll;
