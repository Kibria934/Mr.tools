import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Tools.css'


const Tools = () => {
  const [tools, setTools] = useState([]);
  useEffect(() => {
    fetch(`https://peaceful-ridge-28382.herokuapp.com/get-tools`)
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
      });
  }, []);

  return (
    <div className="bg-slate-800 py-8 ">
      <div className="hover:tracking-widest ease-in duration-300">
        <div className="flex justify-center ">
          <div className="max-w-[80%] lg:max-w-[16%]">
            <p className="text-center text-2xl pb-10 text-white cursor-pointer font-semibold ">
              Some of our tools sample is there for you.
            </p>
          </div>
        </div>
      </div>
      <div className="h-full py-2 px-10">
        <div className="grid mx-auto grid-cols-1 lg:grid-cols-3 gap-5">
          {tools.slice(0, 3).map((tool) => (
            <div>
              <div
                className="max-h-[200px] pb-10 fontStyle lg:max-h-[350px] text-white lg:hover:max-h-[800px] text-xl bg-secondary hover:scale-y-105 hover:shadow-2xl card mb-1 hover:max-h-full ease-in duration-300 overflow-hidden "
                key={tool._id}
              >
                <img 
                  width={"100%"}
                  className="h-96 pb-8"
                  src={tool.img}
                  alt=""
                ></img>
                <div className="card-body">
                  <p className="text-2xl font-bold">{tool.name}</p>
                  <p>
                    Price: {tool.price}
                     <small> p/c</small>
                  </p>
                  <p className="">MinQuantity: {tool.minOrQuantity}</p>
                  <p>Available Quantity: {tool.availableQuantity}</p>
                  <p>{tool.desc.slice(0, 150)}</p>
                  <Link
                    to={`/purchase/${tool._id}`}
                    className="btn mt-5 text-white btn-primary"
                  >
                    BOOK NOW
                  </Link>
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
