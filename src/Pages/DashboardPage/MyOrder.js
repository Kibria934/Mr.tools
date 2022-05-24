import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../../SharedPage/Loading";

const MyOrder = () => {
  const [user, loading, Autherror] = useAuthState(auth);
  // const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     fetch(`http://localhost:5000/get-order?email=${user.email}`, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //       .then((res) => {
  //         console.log("res", res);
  //         if (res.status === 401 || res.status === 403) {
  //           signOut(auth);
  //           localStorage.removeItem("accessToken");
  //           navigate("/");
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setOrders(data);
  //       });
  //   }
  // }, [user]);

  const {
    isLoading,
    error,
    refetch,
    data: orders,
  } = useQuery('orders', () =>
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

if(isLoading){
  <Loading/>
}
  const handleCancel =async (id) => {
    const proceed = window.confirm('Are you really want to cancel this order')
  if(proceed){
    fetch(`http://localhost:5000/delete-order/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if(res.status===200){
          refetch()
          toast.success('Your order canceled')
        }
        
       return res.json()
      })
      .then((data) => {
      });
  }
  };

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
                    <button
                      onClick={() => handleCancel(o._id)}
                      className="btn btn-error btn-sm ml-4"
                      type=""
                    >
                      Cancel
                    </button>
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
    </div>
  );
};

export default MyOrder;
