import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const BestProduct = () => {
    const navigate=useParams()
  const [best, setBest] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/get-tools`)
      .then((res) => res.json())
      .then((data) => {
        setBest(data);
        console.log(data);
      });
  }, []);
  console.log(best.length);

  return (
    <div className="mx-auto w-10/12">
      <h3 className="text-4xl my-8">The best prducts</h3>
      <div className="grid grid-cols-4 gap-5">
        {best?.slice(5, 9).map((b) => (
          <div onClick={()=>navigate(`/purchase/${b._id}`)} class="card hover:shadow-2xl hover:translate-y-4 w-96 bg-base-100 shadow-xl">
            <figure>
              <img
              className=""
                src={b?.img}
                alt="tools"
              />
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
