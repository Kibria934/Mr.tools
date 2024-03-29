import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();

    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_KEY}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          const product = {
            name: data.name,
            availableQuantity: data.availableQuantity,
            desc: data.desc,
            img: image,
            minOrQuantity: data.minOrQuantity,
            price: data.price,
          };
          fetch("https://mr-tools-server.vercel.app/post-tools", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                Navigate("/");
                toast.success("Product successfully added");
                // reset();
              } else {
                toast.error("Failed to add the product");
              }
            });
        }
      });
  };

  return (
    <div>
      <h3 className="text-4xl text-center mb-3">Add New Products</h3>

      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <input
              type="text"
              placeholder="Product Name"
              name="Name"
              className="input my-2 input-bordered"
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Product Price"
              name="price"
              className="input my-2 input-bordered"
              {...register("price", { required: true })}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Minimum Order Quantity"
              name="minOrQuantity"
              className="input my-2 input-bordered"
              {...register("minOrQuantity", { required: true })}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Available Quantity"
              name="availableQuantity"
              className="input my-2 input-bordered"
              {...register("availableQuantity", { required: true })}
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              placeholder="Minimum Order Quantity"
              name="image"
              className="input my-2 input-bordered"
              {...register("image", { required: true })}
            />
          </div>
          <div className="form-control">
            <textarea
              type="text"
              placeholder="Description of products..."
              name="desc"
              className="input h-20 my-2 input-bordered"
              {...register("desc", { required: true })}
            />
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value={"save"} />
          </div>
        </form>
      </div>
      {/* ------------------------------ */}
    </div>
  );
};

export default AddProduct;
