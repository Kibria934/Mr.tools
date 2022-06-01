import React from "react";
import summary from "../../Assets/images/summary.png";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import {Link} from 'react-router-dom'

const Summary = () => {
  return (
    <div>
      <h1 className="lg:text-5xl text-2xl text-center text-primary uppercase font-bold mb-0 mt-8">
        Million business has trusted us
      </h1>
      <div
        style={{ background: `url(${summary})` }}
        class="stats border-0 flex mx-auto lg:w-[90vw] h-[40vh] mt-10 shadow"
      >
        <div class="stat place-items-center">
          <div>
            <p className="lg:text-8xl text-4xl text-[#e6194d]">
              <BsCalendarEvent />
            </p>
            <span class="stat-value text-primary ">31M+</span>
            <h1 className=" lg:text-3xl py-2">Revenue</h1>
          </div>
        </div>

        <div class="stat place-items-center">
          <div>
            <p className="lg:text-8xl text-5xl text-[#e6194d]">
              <MdOutlineRateReview />
            </p>
            <span class="stat-value text-primary ">33K+</span>
            <h1 className=" lg:text-3xl py-2"> Reviews</h1>
          </div>
        </div>

        <div class="stat place-items-center">
          <div>
            <p className="lg:text-8xl text-5xl text-[#e6194d]">
              <RiCustomerService2Fill />
            </p>
            <span class="stat-value text-primary ">23K+</span>
            <h1 className=" lg:text-3xl py-2">customers</h1>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 flex justify-center h-full shadow-2xl lg:w-[50vw] w-full mx-auto shadow-xl">
        <div class="card-body flex lg:flex-row items-center justify-between">
          <div className="lg:w-[30vw]">
            <h2 class="card-title w-full text-secondary lg:text-4xl">
              Have any question about us or get a product request?
            </h2>
          </div>
          <div class="card-actions justify-end">
            <Link to='/portfolio' class="btn btn-primary">Contact</Link>
            <Link to='/dashboard/myProfile' class="btn btn-secondary">Explore</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
