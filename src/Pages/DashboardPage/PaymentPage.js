import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Loading from "../../SharedPage/Loading";

const stripePromise = loadStripe(
  "pk_test_51L188zJgDDR6frswkdkuugO6OjdjyVK3a25yxM3butcuKQxqyxJkrgLoilotbrj8jczQVpn7Lf1SyQ2VlEzMYvLA00c3bOLNzh"
);

const PaymentPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery(["order", id], () =>
    fetch(`https://peaceful-ridge-28382.herokuapp.com/get-order/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div class="card w-sm lg:w-2/5 bg-green-100 shadow-xl">
        <div class="card-body w-full">
          <h2 class="card-title text-3xl font-bold">Hello {order?.userName}</h2>
          <p className="text-xl ">
            Your have chosen{" "}
            <span className="text-orange-700 font-semibold text-2xl">
              {order?.productName}
            </span>{" "}
            to buy
          </p>
          <p className="text-xl">
            {" "}
            It's total price is{" "}
            <span className="text-orange-700 font-semibold text-xl">
              ${order?.totalPrice}
            </span>
          </p>
          <p>
            Quantity is{" "}
            <span className="font-semibold text-orange-700">
              {order?.orderQuantity}
            </span>
          </p>
        </div>
      </div>

      <div class="card mt-10 w-96 lg:w-2/5 bg-red-50 shadow-xl">
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      </div>
    </>
  );
};

export default PaymentPage;
