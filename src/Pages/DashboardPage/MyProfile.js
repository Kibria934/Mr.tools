import React, { useReducer, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQueries } from "react-query";
import { useNavigate } from "react-router-dom";
import man from "../../Assets/images/man1.jpg";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user, loading, UserError] = useAuthState(auth);
  const [change, setChange] = useState(false);
  const { register, handleSubmit } = useForm();

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQueries(
    "profile",
    fetch(`http://localhost:5000/userProfile?email=${user.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
console.log(userInfo);

  const onSubmit = (data) => {
    console.log(data);
    fetch(`http://localhost:5000/userProfile?email=${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    setChange(false);
  };

  const handleUpdate = () => {
    setChange(true);
  };
  return (
    <div>
      <div class="hero lg:min-w-[1300px] min-h-full ml-28 my-20">
        <div class="hero-content min-w-full bg-base-200  flex-col ">
          <img
            src={man}
            class="max-w-sm mt-[-200px] border-emerald-200 border-2 rounded-full shadow-2xl"
            alt=""
          />
          <div className="w-full px-6">
            <h1 class="text-5xl text-left  font-bold">{user.displayName}</h1>
            <p class="text-xl text-left my-2 ">{user.email}</p>
            {change && (
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <span>
                  Address:{" "}
                  <input
                    class="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 "
                    placeholder="Country..."
                    name="country"
                    {...register("country")}
                  ></input>
                </span>{" "}
                /
                <span>
                  <input
                    class="text-lg py-2 ml-2 bg-transparent px-5 border-b-4 border-primary my-2 "
                    placeholder="City"
                    name="city"
                    {...register("city")}
                  ></input>
                </span>
                <br />
                <span>
                  Education:{" "}
                  <input
                    class="text-lg py-2  bg-transparent px-5 border-b-4 border-primary my-2 "
                    placeholder="Educational qualification"
                    name="educational"
                    {...register("educational")}
                  ></input>
                </span>
                <br />
                <span>
                  Phone Number:
                  <input
                    class="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="Number"
                    name="phone"
                    {...register("phone")}
                  ></input>
                </span>
                <br />
                <span>
                  Facebook Link:
                  <input
                    class="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="Facebook url"
                    {...register("facebook")}
                  ></input>
                </span>
                <br />
                <span>
                  LinkedIn:
                  <input
                    class="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="LinkedIn url"
                    {...register("inkedIn")}
                  ></input>
                </span>
                <br />
                <input className="btn btn-secondary" type="submit" />
              </form>
            )}

            {!change && (
              <button onClick={handleUpdate} class="btn btn-primary">
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
