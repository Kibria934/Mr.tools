import React from "react";
import summary from "../../Assets/images/summary.png";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import {Link} from 'react-router-dom'

const Summary = () => {
  return (
    <div>
      <h1 className="text-5xl text-center text-primary uppercase font-bold mb-0 mt-8">
        Million business has trusted us
      </h1>
      <div
        style={{ background: `url(${summary})` }}
        class="stats border-0 flex mx-auto w-[90vw] h-[40vh] mt-10 shadow"
      >
        <div class="stat place-items-center">
          <div>
            <p className="text-8xl text-green-600">
              <BsCalendarEvent />
            </p>
            <span class="stat-value text-primary">31M+</span>
            <h1 className=" text-3xl">Annual revenue</h1>
          </div>
        </div>

        <div class="stat place-items-center">
          <div>
            <p className="text-8xl text-green-600">
              <MdOutlineRateReview />
            </p>
            <span class="stat-value text-primary">33K+</span>
            <h1 className=" text-3xl"> Reviews</h1>
          </div>
        </div>

        <div class="stat place-items-center">
          <div>
            <p className="text-8xl text-green-600">
              <RiCustomerService2Fill />
            </p>
            <span class="stat-value text-primary">23K+</span>
            <h1 className=" text-3xl">customers</h1>
          </div>
        </div>
      </div>
      <div class="card  bg-base-100 flex justify-center h-full shadow-2xl w-[50vw] mx-auto shadow-xl">
        <div class="card-body flex flex-row items-center justify-between">
          <div className="w-[30vw]">
            <h2 class="card-title w-full text-secondary text-4xl">
              Have any question about us or get a product request?
            </h2>
          </div>
          <div class="card-actions justify-end">
            <Link to='/portfolio' class="btn btn-primary">Contact</Link>
            <Link to='/myProfile' class="btn btn-secondary">Explore</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
