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
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();

  const {
    isLoading,
    error,
    refetch,
    data: orders,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/get-order?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/");
      }
      return res.json();
    })
  );

  if (isLoading) {
    <Loading />;
  }

  const handleCancel = async (id) => {
    const proceed = window.confirm("want to cnfiem?");
    if (proceed) {
      fetch(`http://localhost:5000/delete-order/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            refetch();
            toast.success("Your order canceled");
          }

          return res.json();
        })
        .then((data) => {});
    }
  };

  return (
    <div class="overflow-x-auto mx-auto mt-[-30px] lg:mr-20 lg:w-[70%]">
      <h1 className="text-center text-3xl  font-bold text-primary my-8">
        MY ORDERS
      </h1>

      <table class="table mx-auto w-full">
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
                      // for="my-modal-6"
                      onClick={() => handleCancel(o._id)}
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
      {/* <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            Congratulations random Interner user!
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div
            onClick={()=>handleCancel(orders.)}
            class="modal-action"
          >
            <label for="my-modal-6" class="btn">
              Yay!
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyOrder;
