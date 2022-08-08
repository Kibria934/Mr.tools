import React from "react";
import { BsTruck } from "react-icons/bs";
import { VscGistSecret } from "react-icons/vsc";
import { MdOutlinePayment } from "react-icons/md";
import WhyChose from "./WhyChose";
import tools1 from "../../Assets/images/tools1.png";
import secret from "../../Assets/images/secrete.png";
import success from "../../Assets/images/success.png";

const More = () => {
  // const form = useLocation();
  return (
    <div className="food-section lg:w-[70vw] mx-auto">
      <h1 className="lg:text-5xl text-3xl px-3 my-6">Why you chose us</h1>
      <p className="lg:w-2/4 text-xl px-3 font-serif">
        We are the fastest product supplier service. You can get your on
        time.Your info is always very private.Our payment service is very easy
      </p>
      <div className=" px-2  grid gap-2 grid-cols-2 lg:grid-cols-3  justify-between">
        <WhyChose img={tools1} icon={<BsTruck />} head={"Fast Service"}>
          We serve our customer in a very fast Delivery system. We dont late
          never. We are very carefull of our respected customer.
        </WhyChose>
        <WhyChose
          img={secret}
          icon={<VscGistSecret />}
          head={"Secrete your info"}
        >
          User information valuable for us. We keep their secret very highly. We
          use our best process to make it.
        </WhyChose>
        <WhyChose
          img={success}
          icon={<MdOutlinePayment />}
          head={"Easy payment"}
        >
          Our specialty is easy payment system. This is the way we can make
          satisfy our user.
        </WhyChose>
      </div>
    </div>
  );
};

export default More;
