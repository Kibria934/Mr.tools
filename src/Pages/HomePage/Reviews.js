import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import SingleReview from "./SingleReview";
const axios = require("axios");

const Reviews = () => {
  const [user, loading, AuthError] = useAuthState(auth);
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch(`https://mr-tools-server.vercel.app/get-review`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-center text-primary lg:my-8 text-4xl  h-full block mx-auto mb-20 lg:py-2  lg:w-1/4 mt-20 font-semibold">
          Clients Feedback
        </h1>
      </div>
      <div>
        <div className="grid lg:gap-1 grid-cols-1 w-9/12 mx-auto  lg:grid-cols-3">
          {review.map((r) => (
            <SingleReview key={r._id} review={r}></SingleReview>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
