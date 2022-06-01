import React, { Children } from "react";
import { BsTruck } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";




const WhyChose = ({children,head,icon,img}) => {
  return (
    <div>
      <div className="mt-10">
        <div class="card card-compact lg:w-96 w-[100%] mx-auto bg-base-100 shadow-xl">
          <figure>
            <img className="lg:min-h-[350px] h-[200px]"
              src={img}
              alt="Tools"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              <span className="p-2 bg-red-500 text-white text-xl font-semibold border rounded-full">
                {icon}
              </span>
             {head}
            </h2>
            <p>
           {children}
            </p>
            <div class="card-actions  justify-end">
              <Link
                class="text-lg flex text-primary hover:text-red-700 items-center"
                to={"/portfolio"}
              >
                See more <BsArrowRight className="ml-2" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChose;
