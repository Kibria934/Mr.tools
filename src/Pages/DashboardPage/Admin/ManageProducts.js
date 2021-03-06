import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../../SharedPage/Loading";
import Modal from "../../../SharedPage/Modal";

const ManageProducts = () => {
  const [tools, setTools] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const { data, isLoading, refetch } = useQuery("tools", () =>
    fetch(`https://peaceful-ridge-28382.herokuapp.com/get-tools`)
      .then((res) => res.json())
      .then((data) => setTools(data))
  );

  if (isLoading) {
    <Loading />;
  }

  return (
    <div>
      <h3 className="text-4xl text-center mb-8 text-secondary">
        Manage Your Products:
      </h3>
      <div className="grid grid-cols-1 h-full ml-10 lg:grid-cols-4 lg:float-right gap-16 lg:w-10/12">
        {tools?.map((t) => (
          <div class="card w-64 bg-base-100 shadow-xl">
            <figure>
              <img className=" h-52" src={t?.img} alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{t?.name}</h2>
              <span className="my-0">Price:{t?.price}</span>
              <span className="my-0">
                Available Stock:{t?.availableQuantity}
              </span>
              <span className="my-0">Minimun Quantity:{t?.minOrQuantity}</span>
              <span className="my-0">{t?.desc}</span>
              <div class="card-actions justify-end">
                <label
                  for="my-modal"
                  onClick={() => setConfirmId(t._id)}
                  className="btn modal-button btn-primary"
                  type=""
                >
                  delete
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {confirmId && (
        <Modal
          confirmId={confirmId}
          setConfirmId={setConfirmId}
          refetch={refetch}
        >
          tool
        </Modal>
      )}
    </div>
  );
};

export default ManageProducts;
