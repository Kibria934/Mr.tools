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
    fetch(`https://peaceful-ridge-28382.herokuapp.com/get-review`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReview(data);
      });
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-center text-primary my-8 text-2xl  h-full block mx-auto mb-20 py-2  w-1/4 mt-20 font-semibold">
          Some valuable reviews from our
          <span className="font-bold text-orange-700"> CUSTOMER</span>
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {
            review.map(r=><SingleReview key={r._id} review={r}></SingleReview>)
          }
        </div>
      </div>
    </div>
  );
};

export default Reviews;
