import React, { useEffect, useReducer, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
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
    refetch,
  } = useQuery("userInfo", () =>
    fetch(
      `https://mr-tools-server.vercel.app/userProfile?email=${user?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 404) {
        return "nothing found";
      }
      return res?.json();
    })
  );

  const onSubmit = (data) => {
    const info = {
      userName: user.name,
      email: user.email,
      country: data.country,
      city: data.city,
      phone: data.phone,
      facebook: data.facebook,
      linkedIn: data.linkedIn,
      education: data.education,
      about: data.about,
    };
    fetch(
      `https://mr-tools-server.vercel.app/userProfile?email=${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(info),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });

    setChange(false);
  };

  if (isLoading) {
    <loading />;
  }

  const handleUpdate = () => {
    setChange(true);
  };
  const handleBack = () => {
    setChange(false);
  };

  return (
    <div>
      <div className="hero lg:min-w-[1300px] min-h-full lg:ml-28  my-20">
        <div className="hero-content mt-28 min-w-full bg-base-200  flex-col ">
          <img
            src={man}
            className="max-w-xs mt-[-200px] border-emerald-200 border-2 rounded-full shadow-2xl"
            alt=""
          />
          <div className="w-full mt-10 px-6">
            <h1 className="lg:text-5xl text-3xl text-left  font-bold">
              {user.displayName}
            </h1>
            <p className="lg:text-5xl text-xl text-left my-2 ">{user.email}</p>
            <p className="lg:text-5xl text-xl text-left my-2 ">
              Country:
              <span className="text-secondary font-bold">
                {userInfo?.country}
              </span>{" "}
              <span className="ml-10">
                City:{" "}
                <span className="text-secondary font-bold">
                  {userInfo?.city}
                </span>
              </span>
            </p>
            <p className="text-xl text-left my-2 ">
              Phone number:{" "}
              <span className="text-secondary font-bold">
                {userInfo?.phone}
              </span>
            </p>
            <p className="text-xl text-left my-2 ">
              About Me:
              <span className="text-secondary font-bold">
                {userInfo?.about}
              </span>
            </p>

            {change && (
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <span>
                  Address:{" "}
                  <input
                    className="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 "
                    placeholder="Country..."
                    name="country"
                    {...register("country")}
                  ></input>
                </span>{" "}
                /
                <span>
                  <input
                    className="text-lg py-2 ml-2 bg-transparent px-5 border-b-4 border-primary my-2 "
                    placeholder="City"
                    name="city"
                    {...register("city")}
                  ></input>
                </span>
                <br />
                <span>
                  Education:{" "}
                  <input
                    className="text-lg py-2  bg-transparent px-5 border-b-4 border-primary my-2 "
                    placeholder="Educational qualification"
                    name="educational"
                    {...register("education")}
                  ></input>
                </span>
                <br />
                <span>
                  Phone Number:
                  <input
                    className="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="Number"
                    name="phone"
                    {...register("phone")}
                  ></input>
                </span>
                <br />
                <span>
                  Facebook Link:
                  <input
                    className="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="Facebook url"
                    {...register("facebook")}
                  ></input>
                </span>
                <br />
                <span>
                  LinkedIn:
                  <input
                    className="text-lg py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="LinkedIn url"
                    {...register("linkedIn")}
                  ></input>
                </span>
                <br />
                <span>
                  <textarea
                    className="text-lg lg:w-full lg:h-40 textarea py-2 bg-transparent px-5 border-b-4 border-primary my-2 s"
                    placeholder="About you"
                    {...register("about")}
                  />
                </span>
                <br />
                <input
                  className="btn btn-secondary"
                  type="submit"
                  value={"save"}
                />
              </form>
            )}

            {change && (
              <button
                onClick={handleBack}
                className="btn float-right btn-primary"
              >
                Back
              </button>
            )}
            {!change && (
              <button onClick={handleUpdate} className="btn btn-primary">
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
