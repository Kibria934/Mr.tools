import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading, AuthError] = useAuthState(auth);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const review = {
      ...data,
      email: user?.email,
    };
    fetch(
      `https://peaceful-ridge-28382.herokuapp.com/review?email=${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(review),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        toast.success("Your Review added successfully");
        navigate("/");
      });
  };
  return (
    <>
      <h1 className="text-center text-3xl  font-bold text-primary my-8">
        MY REVIEW
      </h1>

      <form className="w-[700px]" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder=""
          value={user?.displayName}
          className=" my-2 py-2 text-2xl w-full border-b-4 border-indigo-500  "
          {...register("userName", { required: true })}
        />
        <br />
        <input
          placeholder="Your country"
          className=" my-2 py-2 text-2xl w-full border-b-4 border-indigo-500"
          {...register("location", { required: true })}
        />
        <br />
        <input
          placeholder="Rating, 1-5 are available"
          className=" my-2 py-2 text-2xl w-full border-b-4 border-indigo-500"
          type="number"
          {...register("Rating", { required: true })}
        />
        <br />
        <textarea
          placeholder="Your review..."
          className=" my-2 py-2 text-xl w-full border-b-4 border-indigo-500 h-44"
          {...register("description", { required: true })}
        />
        <br />
        <input type="submit" className="btn btn-primary w-48" value={"save"} />
      </form>
    </>
  );
};

export default AddReview;
