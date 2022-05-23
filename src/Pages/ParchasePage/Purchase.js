import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { async } from "@firebase/util";
import toast from "react-hot-toast";

const Purchase = () => {
  const { id } = useParams();
  console.log(id);
  const {
    isLoading,
    error,
    refetch,
    data: singleData,
  } = useQuery("singleData", () =>
    fetch(`http://localhost:5000/get-tools/${id}`).then((res) => res.json())
  );

  const { tools, setTools } = useState({});

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const { name, img, desc, minOrQuantity, price, availableQuantity } =
    singleData;

  const handleIncrease = (e) => {
    e.preventDefault();
    const count = e.target.quantity.value;
    const number = +count;
    if (count < 0) {
      toast.error("Please enter valid number");
      e.target.reset();
    }
    if (count > +availableQuantity - count) {
      toast.error(`We have not more than ${availableQuantity} products`);
      e.target.reset();
    }
    if (count > 0 && count < +availableQuantity - count) {
      axios
        .put(`http://localhost:5000/update-tools/${id}`, {
          quantity: +minOrQuantity + number,
        })
        .then((data) => {
          console.log(data);
          refetch();
        });
      console.log(+availableQuantity - count);
    }
    e.target.reset();
  };
  const handleDecrease = () => {
    if (minOrQuantity <= 0) {
      toast.error("You have no products to remove");
    }
    if (minOrQuantity > 0) {
      axios
        .put(`http://localhost:5000/update-tools/${id}`, {
          quantity: minOrQuantity - 1,
        })
        .then((data) => {
          console.log(data);
          refetch();
        });
    }
  };

  console.log(singleData);

  return (
    <div className=" p-16 bg-emerald-100 lg:p-0">
      <div>
        <div class="card mt-20 w-full ">
          <figure>
            <img width={"800px"} src={singleData.img} alt="car!" />
          </figure>
          <div className="mt-8 mx-auto max-w-[60vw]">
            <div>
              <div>
                <h1 className="text-center text-xl font-semibold">
                  <span className="bg-gray-400 p-5">Quantity of</span>
                  <span className="p-5 bg-orange-400">
                    Products:{" "}
                    <strong className="text-primary ">{minOrQuantity}</strong>{" "}
                  </span>
                </h1>
                <div className="flex flex-row justify-around mt-10">
                  <form onSubmit={handleIncrease}>
                    <input
                      type="number"
                      className="input text-lg input-border px-3 input-primary"
                      name="quantity"
                      placeholder="Add quantity"
                    />
                    <button
                      title="Add more products"
                      className="btn btn-outline btn-secondary"
                      type=""
                    >
                      Increase
                    </button>
                  </form>
                  <div>
                    <button
                      onClick={handleDecrease}
                      title="Remove products"
                      className="btn btn-outline btn-neutral"
                      type=""
                    >
                      Decrease
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex mt-10 text-lg text-primary flex-col justify-around ">
              <div className="">
                <h2 className="text-4xl">{name}</h2>
                <h3 className="text-2xl">
                  Available Stock: {availableQuantity}
                  <small>ps</small>
                </h3>
                <h3>Description:{desc}</h3>
              </div>
              <div className="flex justify-center">
                <button class="btn my-6 w-96 text-white btn-primary">
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
