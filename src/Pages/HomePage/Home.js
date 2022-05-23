import React from "react";
import Bannar from "./Bannar";
import Reviews from "./Reviews";
import Summary from "./Summary";
import Tools from "./Tools";

const Home = () => {
  return (
    <div>
      <Bannar />;
      <Tools/>
      <Summary/>
      <Reviews/>
    </div>
  );
};

export default Home;
