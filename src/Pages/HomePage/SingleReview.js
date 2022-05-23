import React from "react";

const SingleReview = ({ info,float }) => {
  const { name, loaclity, review } = info;
  console.log(float);
  

  return (
    <div className={`lg:w-[60%] float-${float} shadow-2xl my-16 w-96 px-10`}>
      <div class="card w-full bg-primary rounded-none ease-in duration-300 border-r-8 opacity-80 hover:opacity-100 border-red-700 text-white shadow-xl">
        <div class="card-body  flex lg:flex-row items-center ">
          <div class="avatar">
            <div class="w-24 mask mask-hexagon">
              <img src="https://i.ibb.co/3z6CpTT/istockphoto-1201514204-612x612.jpg" />
            </div>
          </div>
          <div>
            <h2 class="card-title pl-10">{name}</h2>
            <h4 className="pl-10">{loaclity}</h4>
            <p className="w-3/5 pl-10">{review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
