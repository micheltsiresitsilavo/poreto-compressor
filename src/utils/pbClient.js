import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_BASE_URL);

export default pb;
