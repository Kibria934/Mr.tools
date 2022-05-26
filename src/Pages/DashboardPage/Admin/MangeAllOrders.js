import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../../SharedPage/Loading";

const MangeAllOrders = () => {
  const [user, loading, authError] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("orders", () =>
    fetch(`https://peaceful-ridge-28382.herokuapp.com/get-allOrder`, {
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

  if (isLoading || loading) {
    <Loading />;
  }

  const handleShip = (id) => {
    fetch(`https://peaceful-ridge-28382.herokuapp.com/update-allOrder/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully shipped");
        refetch();
      });
  };

  return (
    <>
      <h1 className="text-center text-3xl mb-10 font-bold text-primary my-8">
        MANAGE ALL ORDER
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

                {o.totalPrice && o.paid && o.status !== "shiped" && (
                  <div class="indicator">
                    <span class="indicator-item badge badge-primary">
                      Panding..
                    </span>
                    <span class="grid min-w-28  p-3  bg-base-200 place-items-center">
                      {o.productName}
                    </span>
                  </div>
                )}
                {o.totalPrice && o.paid && o.status === "shiped" && (
                  <td>
                    <div class="indicator">
                      <span class="indicator-item badge badge-primary">
                        Shipped
                      </span>
                      <span class="grid w-full p-3  bg-base-200 place-items-center">
                        {o.productName}
                      </span>
                    </div>
                  </td>
                )}
                {!o.paid && o.status !== "shiped" && <td>{o.productName}</td>}

                <td className="text-xl font-semibold">$ {o.totalPrice}</td>
                <td>
                  {o.orderQuantity}
                  <small>Pc</small>
                </td>
                <td className="text-center">
                  {o.totalPrice && !o.paid && (
                    <>
                      <button className="text-xl text-primary font-semibold">
                        Unpaid
                      </button>
                    </>
                  )}
                  {o.totalPrice && o.paid && o.status !== "shiped" && (
                    <div>
                      <button
                        onClick={() => handleShip(o._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Shipe
                      </button>
                    </div>
                  )}
                  {o.totalPrice && o.paid && o.status === "shiped" && (
                    <div>
                      <button className="text-xl text-primary">Shiped</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MangeAllOrders;
