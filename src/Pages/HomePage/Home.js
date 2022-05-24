import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Footer from "../../SharedPage/Footer";
import Loading from "../../SharedPage/Loading";
import Bannar from "./Bannar";
import Reviews from "./Reviews";
import Summary from "./Summary";
import Tools from "./Tools";

const Home = () => {
  return (
    <div>
      <Bannar />;
      <div className="mb-40">
        <Tools />
      </div>
      <div className="mb-40">
      <Summary />
      </div>
      <div className="mb-40">
      <Reviews />
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
};

export default Home;
