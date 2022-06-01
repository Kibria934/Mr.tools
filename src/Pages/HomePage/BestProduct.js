import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BestProduct = () => {
  const navigate = useNavigate();
  const [best, setBest] = useState([]);
  useEffect(() => {
    fetch(`https://peaceful-ridge-28382.herokuapp.com/get-tools`)
      .then((res) => res.json())
      .then((data) => {
        setBest(data);
      });
  }, []);
  return (
    <div className="mx-auto lg:mt-24 mt-8 lg:w-9/12">
      <h3 className="text-4xl text-center mb-3 lg:mb-2 text-primary ">
        The best products
      </h3>
      <div className="border-b-8 mx-auto w-2/12 lg:w-1/12 mb-10 lg:mb-16 rounded-3xl border-red-500"></div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {best?.slice(5, 9).map((b) => (
          <div
            onClick={() => navigate(`/purchase/${b._id}`)}
            class="card hover:shadow-2xl hover:translate-y-4  mx-auto w-10/12 lg:w-96 bg-base-100 "
          >
            <figure>
              <img className="" src={b?.img} alt="tools" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">
                {b?.name}
                <div class="badge badge-secondary">BEST</div>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProduct;
