import { useRef } from "react";
import { deleteData } from "../../../store/store";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import pb from "../../../utils/pbClient";

const ModalDeleteApp = ({ imageId }) => {
  let modale = useRef();
  let boton = useRef();
  const { mutate } = useSWRConfig();

  const deleteApp = async () => {
    const refreshCache = async () => {
      await pb.collection("medias").delete(imageId);
      await deleteData(imageId);
      // mutate("getAllData");
    };

    toast.promise(refreshCache(), {
      loading: "Loading",
      success: () => {
        boton?.current.click();
        mutate("getAllData");

        return "Image deleted successfuly!";
      },
      error: () => {
        boton?.current.click();
        return "Error when deleting";
      },
    });
  };

  return (
    <>
      <div
        className="bg-slate-100 text-slate-700 w-full px-1 py-1 shadow-xl flex justify-center items-center cursor-pointer rounded-r-sm"
        onClick={() => modale?.current.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
        </svg>
      </div>

      <dialog
        id="my_modal_5"
        ref={modale}
        className="modal modal-bottom sm:modal-middle "
      >
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
              id="close"
              ref={boton}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-red-500">Delete</h3>
          <p className="py-4">Are you sure to delete this image?</p>
          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button
              className="btn btn-error"
              onClick={() => deleteApp(imageId)}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalDeleteApp;
