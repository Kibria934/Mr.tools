import React from "react";
import summary from '../../Assets/images/summary.png'
const Summary = () => {
  return (
    <div style={{background:`url(${summary})`}} class="stats flex mx-auto w-[90vw] h-[40vh] my-10 shadow">
      <div class="stat place-items-center">
        <div><span  class="stat-value text-green-700">31M+</span>
        <h1 className=" text-3xl">Annual revenue</h1></div>
      </div>

      <div class="stat place-items-center">
      <div><span  class="stat-value text-green-700">33K+</span>
        <h1 className=" text-3xl"> Reviews</h1></div>
      </div>

      <div class="stat place-items-center">
      <div><span  class="stat-value text-green-700">23K+</span>
        <h1 className=" text-3xl"> customers</h1></div>
      </div>
    </div>
  );
};

export default Summary;

