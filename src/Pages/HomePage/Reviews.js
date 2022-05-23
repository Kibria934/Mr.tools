import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
const axios = require("axios");

const Reviews = () => {
  const [review, setReview] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/get-review")
  //       .then((res) => setReview(res.data)());
  //     console.log(review);
  //   }, []);
  const info1 = {
    name: "John henry",
    index: "1",
    loaclity: "America",
    review:
      "Quality in a product or service is not what the supplier puts in. it is what the customer gets out and is willing to pay for. A product is not quality because it is hard to make and costs a lot of money, as manufacturers typically believe.",
  };
  const info2 = {
    name: "Stephen King",
    index: "2",
    loaclity: "Canada",
    review:
      "A product is something made in a factory; a brand is something that is bought by the customer. A product can be copied by a competitor; a brand is unique. A product can be quickly outdated; a successful brand is timeless.",
  };
  const info3 = {
    name: "Alan Cumming",
    index: "3",
    loaclity: "Srilangka",
    review:
      "My feeling about work is it’s much more about the experience of doing is than the end product. Sometimes things that are really great and make lots of money are miserable to make, and vice versa.",
  };
  return (
    <div>
      <div>
        <h1 className="text-center text-secondary my-8 text-2xl text-primary h-full block mx-auto border-primary py-2  w-1/4 border-b-4 font-bold">
          SOME VALUABLE REVIEWS FROM OUR
          <span className="font-bold text-orange-700"> CUSTOMER</span>
        </h1>
      </div>
      <div className="my-4">
        <div>
          <SingleReview float={"left"} info={info1}></SingleReview>
        </div>
        <div>
          <SingleReview float={"right"} info={info2}></SingleReview>
        </div>
        <div>
          <SingleReview float={"left"} info={info3}></SingleReview>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
