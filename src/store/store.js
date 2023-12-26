import localforage from "localforage";
import { proxy } from "valtio";
import { Uuid } from "../utils/Uuid";

/*
 *#initial state
 */

export const setInitialTheme = async () => {
  const themeInit = await localforage.getItem("theme");
  return themeInit;
};

export const setInitialMe = async () => {
  const isMe = await localforage.getItem("me");
  if (!isMe) {
    await localforage.setItem("me", []);
  }
  return isMe;
};

export const deviceIDInit = async () => {
  const deviceID = await localforage.getItem("deviceID");
  if (!deviceID) {
    await localforage.setItem("deviceID", Uuid());
  }
  return deviceID;
};

export const setInitialData = async () => {
  const isData = await localforage.getItem("data");
  if (!isData) {
    await localforage.setItem("data", []);
  }
  return isData;
};
/*
 *#state
 */

export const stateStore = proxy({
  data: setInitialData(),
  me: setInitialMe(),
  theme: "",
  deviceID: deviceIDInit(),
});

/*
 *#action
 */

// export const setSettings = async (isActivate) => {
//   const response = await localforage.setItem("settings", isActivate);
//   stateStore.settings = response;
// };

export const setData = async (data) => {
  const response = await localforage.setItem("data", data);
  stateStore.data = response;
};

export const uniqData = (data, key) => {
  return [...new Map(data.map((x) => [key(x), x])).values()];
};

export const addData = async (
  data,
  fileName,
  collectionIdParam,
  imagesIdParam,
  imageNameParam,
  createdParam
) => {
  const dataPrev = await localforage.getItem("data");

  if (dataPrev) {
    const dataWithExtra = data.map((it, key) => {
      return {
        ...it,
        data: fileName[key].file,
        fileName: fileName[key].fileName,
        collectionId: collectionIdParam,
        imagesId: imagesIdParam,
        imageName: imageNameParam,
        created: createdParam,
      };
    });

    const dataNew = [...dataPrev, ...dataWithExtra];
    const uniqueData = uniqData(dataNew, (it) => it.name);
    setData(uniqueData);
  } else {
    const dataNew = [...data];
    setData(dataNew);
  }
};

export const deleteData = async (dataID) => {
  const data = await localforage.getItem("data");

  const freshData = data.filter((item) => item.imagesId !== dataID);
  await localforage.setItem("data", freshData);
  stateStore.data = freshData;
};

export const toggleTheme = async (param) => {
  const thema = await localforage.setItem("theme", param);
  stateStore.theme = thema;
};