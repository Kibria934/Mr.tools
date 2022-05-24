import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ order }) => {
  const { totalPrice } = order;
  console.log(totalPrice);

  const stripe = useStripe();
  const elements = useElements();
  const [cardErrors, setCardErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
          console.log(data.clientSecret);
        }
      });
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardErrors(error?.code);
      setSuccess("");
    }  
      setProcessing(true);
      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: order.userName,
              email: order.email,
            },
          },
          
        });
      if (intentError) {
        setCardErrors(intentError?.message);
        setProcessing(false);
      }
      setCardErrors("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("Congrats! Your payment is completed.");

      const paidOrder = {
        order: order._id,
        transactionId: paymentIntent.id,
      };
      fetch(`http://localhost:5000/order/${order._id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(paidOrder)
    }).then(res=>res.json())
    .then(data => {
        setProcessing(false);
        console.log(data);
    })
    
  };
  return (
    <form className="p-8" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7d9",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        s
      />
      <button
        className="btn btn-success btn-sm mt-10"
        type="submit"
        disabled={!stripe || !clientSecret || success}
      >
        Pay
      </button>
      {cardErrors && <p className="text-red-500">{cardErrors}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success} </p>
          <p>
            Your transaction Id:{" "}
            <span className="text-orange-500 font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
