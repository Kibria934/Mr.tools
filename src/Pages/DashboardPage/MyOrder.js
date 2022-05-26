import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../../SharedPage/Loading";
import Modal from "../../SharedPage/Modal";

const MyOrder = () => {
  const [user, loading, Autherror] = useAuthState(auth);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const { isLoading, error, refetch } = useQuery("orders", () =>
    fetch(
      `https://peaceful-ridge-28382.herokuapp.com/get-order?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
      })
  );

  if (isLoading) {
    <Loading />;
  }

  return (
    <>
      <h1 className="text-center text-3xl  font-bold text-primary my-8">
        MY ORDERS
      </h1>
      <div class="overflow-x-auto  w-96 mx-auto mt-[-30px] lg:mr-20 lg:w-[70%]">
        <table class="table mx-auto  lg:w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Order</th>
              <th>Total Price</th>
              <th>Order Quantity</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div class="flex items-center space-x-3">
                    <div>
                      <div class="font-bold">{o.userName}</div>
                    </div>
                  </div>
                </td>
                <td>{o.email}</td>
                <td>{o.productName}</td>
                <td className="text-xl font-semibold">$ {o.totalPrice}</td>
                <td>
                  {o.orderQuantity}
                  <small>Pc</small>
                </td>
                <td className="text-center">
                  {o.totalPrice && !o.paid && (
                    <>
                      <Link to={`/dashboard/payment/${o._id}`}>
                        <button className="btn btn-sm btn-success">pay</button>
                      </Link>
                      <label
                        for="my-modal"
                        onClick={() => setConfirmId(o._id)}
                        className="btn modal-button btn-sm ml-4"
                        type=""
                      >
                        Cancel
                      </label>
                    </>
                  )}
                  {o.totalPrice && o.paid && (
                    <div>
                      <p>
                        <span className="text-success">Paid</span>
                      </p>
                      <p>
                        Transaction id:{" "}
                        <span className="text-success">{o.transactionId}</span>
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* ============ modal =========== */}
        {/* <!-- The button to open modal --> */}
        {/* <label for="my-modal" class="btn modal-button">open modal</label> */}

        {/* <!-- Put this part before </body> tag --> */}

        {confirmId && (
          <Modal
            confirmId={confirmId}
            setConfirmId={setConfirmId}
            refetch={refetch}
          >
            order
          </Modal>
        )}
      </div>
    </>
  );
};

export default MyOrder;
