import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PurchaseModal = ({ tools, setTools, user, totalQuantity }) => {
  const { register, handleSubmit } = useForm();
  const { _id, name, img, desc, minOrQuantity, availableQuantity, price } =
    tools;

  const onSubmit = (data) => {
    const orders = {
      userName: user.displayName,
      productName: name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      totalPrice: +price * totalQuantity,
      orderQuantity: totalQuantity,
      availableQuantity: +availableQuantity,
    };

    axios
      .post(`https://mr-tools-server.vercel.app/post-order`, orders)
      .then((data) => {
        if (data.status === 200) {
          toast.success(`You have successfully booked ${name}`);
        }
        setTools(null);
      });
  };
  return (
    <div>
      <input type="checkbox" id="purchase-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#ffffff] ">
          <label
            htmlFor="purchase-modal"
            className="btn btn-primary btn-circle absolute right-2 top-2"
          >
            X
          </label>
          <h3 className="font-bold text-2xl">{name}</h3>
          <p>Total Booking Products: {totalQuantity}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 grid grid-cols-1 justify-items-center"
          >
            <input
              type="text"
              name="name"
              value={user?.displayName}
              readOnly
              placeholder="Full Name"
              className="bg-[#fff] text-lg border-2 p-3 m-2 rounded-md w-full"
              {...register("name")}
            />

            <input
              type="email"
              name="email"
              value={user?.email}
              readOnly
              {...register("email")}
              placeholder="Email"
              className="bg-[#fff] text-lg border-2 p-3 m-2 rounded-md w-full"
            />
            <input
              type="number"
              name="phone"
              required
              autoComplete="none"
              {...register("phone")}
              placeholder="Phone Number"
              className="bg-[#fff] text-lg border-2 p-3 m-2 rounded-md w-full"
            />
            <input
              type="address"
              name="address"
              // autoComplete="none"
              {...register("address")}
              placeholder="address"
              className="bg-[#fff] text-lg border-2 p-3 m-2 rounded-md w-full"
            />
            <input
              type="submit"
              value="submit"
              placeholder="Type here"
              className="btn btn-primary text-white w-full "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
