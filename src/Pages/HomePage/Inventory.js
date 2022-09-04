import React, { Fragment } from "react";
import { useQuery } from "react-query";
import UseTools from "../../Hook/UseTools";
import Loading from "../../SharedPage/Loading";
const InventoryCart = React.lazy(() => import("./InventoryCart"));

const Inventory = () => {
  const { isLoading, tools } = UseTools();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="gap-10 mx-10 md:grid-cols-3 md:mt-24 mt-28 grid grid-cols-1 lg:grid-cols-3">
      {tools.map((tool) => (
        <InventoryCart key={tools._id} img={tool.img} />
      ))}
    </div>
  );
};

export default Inventory;
