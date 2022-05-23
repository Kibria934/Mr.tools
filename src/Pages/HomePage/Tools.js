import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tools = () => {
  const [tools, setTools] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/get-tools`)
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div className="hover:tracking-widest ease-in duration-300">
        <h2 className="text-secondary font-semibold tracking-widest text-center text-5xl">
          tools
        </h2>
        <div className="flex justify-center ">
          <div className="max-w-[80%] lg:max-w-[13%]">
            <p className="text-center text-xl py-3 text-primary font-semibold ">
              Some of our tools sample is there for you.
            </p>
          </div>
        </div>
      </div>
      <div className="h-full bg-red-100 py-2 px-10">
        <div className="grid mx-auto grid-cols-1 lg:grid-cols-3 gap-5">
          {tools.slice(0, 6).map((tool) => (
           <div>
                <div
              className="max-h-[200px] lg:max-h-[400px] lg:hover:max-h-[800px] text-xl bg-orange-100 hover:scale-y-105 hover:shadow-2xl card mb-1 hover:max-h-full ease-in duration-300 overflow-hidden "
              key={tool._id}
            >
              <img width={"600px"} height={"500px"} src={tool.img} alt=""></img>
              <div className="card-body py-1">
              <p className="text-2xl font-bold">{tool.name}</p>
              <p>Price:{tool.price}<small>p/c</small></p>
              <p className="bg-success py-2 px-1 rounded-lg">MinQuantity:{tool.minOrQuantity}</p>
              <p>Available Quantity:{tool.availableQuantity}</p>
              <p>{tool.desc}</p>
              <Link to={'/purchase'} className="btn btn-outline btn-secondary">BOOK NOW</Link>
              </div>
            </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
