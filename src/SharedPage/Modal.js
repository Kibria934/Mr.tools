import React from "react";
import toast from "react-hot-toast";

const Modal = ({ children, confirmId, setConfirmId, refetch }) => {
  const handleCancel = async (id) => {
      fetch(`http://localhost:5000/delete-${children}/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            refetch();
            toast.success("Your order canceled");
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
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">
            Are You Really Want to Delete?
          </h3>
          <div class="modal-action">
            <label
              for="my-modal"
              onClick={() => handleCancel(confirmId)}
              class="btn"
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
