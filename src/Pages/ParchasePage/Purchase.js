import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { async } from "@firebase/util";
import toast from "react-hot-toast";
import PurchaseModal from "./PurchaseModal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../../SharedPage/Loading";

const Purchase = () => {
  const [user, loading, AuthError] = useAuthState(auth);
  const { id } = useParams();

  const {
    isLoading,
    error,
    refetch,
    data: singleData,
  } = useQuery("singleData", () =>
    fetch(`http://localhost:5000/get-tools/${id}`).then((res) => res.json())
  );
  const num = singleData?.minOrQuantity;
  const [tools, setTools] = useState(null);
  const [count, setCount] = useState(num);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCount(num);
    console.log(count);
    refetch()
    
  } ,[singleData]);

console.log(singleData?.availableQuantity);


  if(loading||isLoading){
    <Loading/>
  }
  const handleIncrease = (e) => {
      setCount(+count + 1);
      if(count > singleData?.availableQuantity ){
      return toast.error('enter valid number')
      }
  };

  const handleDicrease = (e) => {
    setCount(count - 1);
    if (count <= num) {
      return toast.error("Please Enter minimum number");
    }
  };
  const handleModal = () => {
    setTools(singleData);
  };
  console.log(singleData);
  // refetch()

  return (
    <div className="p-16 bg-emerald-100 lg:p-0">
      <div>
        <div class="card mt-20 w-full ">
          <figure>
            <img width={"800px"} className="max-h-[50vh]" src={singleData?.img} alt="product" />
          </figure>
          <div className="mt-8 mx-auto max-w-[60vw]">
            <div>
              <div>
                <div>
                  <div className="flex flex-row justify-center mt-10">
                    <div>
                      <button
                        title="Remove products"
                        className={
                          count < num
                            ? `btn btn-disabled btn-outline  text-3xl text-extrabold btn-neutral`
                            : `btn btn-outline text-3xl text-extrabold btn-neutral`
                        }
                        type=""
                        onClick={handleDicrease}
                      >
                      -
                      </button>
                    </div>
                    <p className="text-2xl mx-5 mt-2 font-bold ">{count}</p>

                    <div>
                      <button
                        title="Add more products"
                        className={`btn btn-outline btn-secondary`}
                        type=""
                        
                        onClick={handleIncrease}
                      >
                       +
                      </button>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="input mx-2 text-lg input-border px-3 w-28 input-primary"
                        name="quantity"
                        placeholder="Add quantity"
                        onChange={(e) => {
                          const value = e.target.value;
                          setCount(+value);
                          refetch()
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className=" flex mt-10 text-lg text-primary flex-col justify-around ">
              <div className="">
                <h2 className="text-4xl">{singleData?.name}</h2>
                <h2 className="text-2xl mt-2">Price: {singleData?.price} <small>pc</small></h2>
                <h3 className="text-2xl">
                  Available Stock: {singleData?.availableQuantity}
                </h3>
                <h3 className="text-2xl">
                  Minimum order quantity: {singleData?.minOrQuantity}
                </h3>
                <p>{singleData?.desc}</p>
              </div>
              <div className="flex justify-center">
                <label
                  htmlFor="purchase-modal"
                  className="btn btn-primary px-10 text-uppercase text-white font-bold bg-gradient-to-r from-primary to-secondary"
                  onClick={handleModal}
                  class={
                    count < num || count > singleData?.availableQuantity
                      ? `btn my-6 btn-disabled w-96 text-white btn-primary`
                      : `btn my-6 w-96 text-white btn-primary`
                  }
                >
                  Purchase
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tools && (
        <PurchaseModal
          user={user}
          setTools={setTools}
          tools={tools}
          totalQuantity={count}
        ></PurchaseModal>
      )}
    </div>
  );
};

export default Purchase;
