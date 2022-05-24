import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../../SharedPage/Loading";

const MyOrder = () => {
  const [user, loading, Autherror] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/get-order?email=${user.email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          console.log("res", res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setOrders(data);
        });
    }
  }, [user]);


  return (
    <div class="overflow-x-auto w-full lg:w-10/12">
      <table class="table w-full">
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
          {/* <!-- row 1 --> */}
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
                <Link  to={"/dashboard/payment"} className="btn btn-sm btn-secondary">
                  Pay
                </Link>
                <button type="" className="btn btn-sm btn-error ml-2">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
