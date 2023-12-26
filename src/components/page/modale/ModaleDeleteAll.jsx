import { useRef, useState } from "react";
import { useSWRConfig } from "swr";
import pb from "../../../utils/pbClient";
import { stateStore } from "../../../store/store";
import localforage from "localforage";
import toast from "react-hot-toast";

const ModalDeleteAll = ({ dataToDelete }) => {
  let modale = useRef();
  let boton = useRef();

  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDeleteAll = async () => {
    const refreshCache = async () => {
      for (let image of dataToDelete) {
        setLoading(true);
        await pb.collection("medias").delete(image.id);
        setLoading(false);
        localforage.setItem("data", []);
        stateStore.data = [];
        mutate("getAllData");
      }
    };

    toast.promise(refreshCache(), {
      loading: "Loading",
      success: () => {
        boton?.current.click();
        mutate("getAllData");

        return "All image deleted successfuly!";
      },
      error: () => {
        boton?.current.click();
        return "Error when deleting";
      },
    });
  };

  return (
    <>
      <button
        className="btn btn-error btn-sm"
        onClick={() => modale?.current.showModal()}
      >
        {loading ? (
          <span className="loading loading-bars loading-xs"></span>
        ) : (
          " Delete all images"
        )}
      </button>
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
          <p className="py-4">Are you sure to delete all images?</p>
          <div className="modal-action ">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-error" onClick={() => handleDeleteAll()}>
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalDeleteAll;
