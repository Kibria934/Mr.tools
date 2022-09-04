import React, { Suspense } from "react";
import auth from "../../firebase.init";
import Footer from "../../SharedPage/Footer";
import Loading from "../../SharedPage/Loading";
import { motion } from "framer-motion";

const BestProduct = React.lazy(() => import("./BestProduct"));
const More = React.lazy(() => import("./More"));
const Reviews = React.lazy(() => import("./Reviews"));
const Summary = React.lazy(() => import("./Summary"));
const Bannar = React.lazy(() => import("./Bannar"));
const Tools = React.lazy(() => import("./Tools"));
// import Tools from "./Tools";

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth }}
        transition={{ duration: 0.2 }}
      >
        <Bannar />;
        <div className="mb-40">
          <Summary />
        </div>
        <div className="mb-40">
          <Tools />
        </div>
        <More />
        <BestProduct />
        <div className="mb-40">
          <Reviews />
        </div>
        <div>
          <Footer />
        </div>
      </motion.div>
    </Suspense>
  );
};

export default Home;
