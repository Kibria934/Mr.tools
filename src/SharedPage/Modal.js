import React from "react";
import toast from "react-hot-toast";

const Modal = ({ children, confirmId, setConfirmId, refetch }) => {
  const handleCancel = async (id) => {
    fetch(
      `https://peaceful-ridge-28382.herokuapp.com/delete-${children}/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Your products deleted");
        }
        if (res.status === 200) {
          setConfirmId(null);
          return res.json();
        }
      })
      .then((data) => {});
  };

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            for="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Are You Really Want to Delete?</h3>
          <div className="modal-action">
            <label
              for="my-modal"
              onClick={() => handleCancel(confirmId)}
              className="btn"
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
