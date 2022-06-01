import React from "react";
import { Link } from "react-router-dom";
import banner1 from "../../Assets/images/banner0.jpg";

const Bannar = () => {
 

  return (
    <div className="mt-16 h-[80vh]" style={{backgroundImage:`url(${banner1})`,opacity:'1',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'bottom'}}>
      <div className="text-5xl bg-base-200 px-[5%] lg:max-w-2xl text-primary max-w-sm z-50 opacity-100 h-full flex flex-col justify-center  font-bold">
        <h1>Best Place For Your Searching Tools</h1>
        <p className="text-xl font-normal my-5 text-black">You can find your beast working tools here. To select it, just scroll and find.We always ready to serve you with our best.</p>
        <Link  to='/dashboard/myProfile' className="btn btn-primary max-w-xs text-white">Get start</Link>
      </div>
    </div>
  );
};

export default Bannar;
