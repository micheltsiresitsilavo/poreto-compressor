import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localforage from "localforage";
dayjs.extend(relativeTime);

const deleteWeek = async () => {
  const data = await localforage.getItem("data");

  for (let imageCompressed of data) {
    const test = dayjs(imageCompressed).toNow();
    console.log(test);
  }
};

export default deleteWeek;
