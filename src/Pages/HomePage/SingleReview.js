import React from "react";

const SingleReview = ({ review }) => {
  return (
    <div className={`mx-auto   lg:w-11/12`}>
      <div class="card w-full rounded-xl lg:min-h-[310px] max-h-[400px] bg-base-100 rounded-none ease-in duration-300 border-b-8 border-red-700 border text-primary shadow-xl">
        <div class="card-body flex lg:flex-row items-center ">
          <div class="avatar">
            <div class="w-24 mask mask-hexagon">
              <img src="https://i.ibb.co/3z6CpTT/istockphoto-1201514204-612x612.jpg" />
            </div>
          </div>
          <div>
            <h2 class="card-title pl-4">{review.userName}</h2>
            <h4 className="pl-4">{review.location}</h4>
            <h4 className="pl-4">Rating: {review.Rating} start</h4>
          </div>
        </div>
          <div>
            <p className="w-full p-6">{review.description}</p>
          </div>
      </div>
    </div>
  );
};

export default SingleReview;
