import React from "react";

const SingleReview = ({ review }) => {
  return (
    <div className={`mx-auto cursor-pointer mb-4 lg:w-11/12`}>
      <div className="card w-full rounded-xl hover:border-b-red-600 lg:min-h-[310px] max-h-[400px] bg-base-100 rounded-none ease-in duration-300 border-b-8  border text-primary shadow-xl">
        <div className="card-body flex lg:flex-row items-center ">
          <div className="avatar">
            <div className="w-24 border-2 mask mask-hexagon">
              <img src="https://i.ibb.co/3z6CpTT/istockphoto-1201514204-612x612.jpg" />
            </div>
          </div>
          <div>
            <h2 className="card-title pl-4">{review.userName}</h2>
            <h4 className="pl-4">{review.location}</h4>

            <h3 className="pl-4"> Rating: {review.Rating} start</h3>
          </div>
        </div>
        <div>
          <p title={review.description} className="w-full p-6">
            {review.description.slice(0, 200)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
