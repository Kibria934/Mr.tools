import React from "react";
import me from "../../Assets/images/me.JPG";

const Portfolio = () => {
  return (
    <div className="mt-28 ">
      <div class="hero lg:min-w-sm lg:min-h-full my-20">
        <div class="hero-content w-96 lg:min-w-[90vw] bg-base-200 mt-10 flex-col ">
          <img
            src={me}
            class="lg:max-w-[50%] lg:w-[20%] lg:mt-[-200px] mt-[-150px] w-64 border-emerald-200 border-2 rounded-full shadow-2xl"
            alt=""
          />
          <div className="lg:w-full px-6">
            <h1 class="text-5xl text-left  font-bold">Md.Kibria Hossain</h1>
            <p class="text-xl text-left my-2 ">kibriahossain934@gmail.com</p>
            <p class="text-xl text-left my-2 ">
              Address: Dhaka, Gazipur,Sreepur
            </p>
          </div>
          <div className="lg:w-full w-96 ml-3 pl-4 lg:px-6">
            <h3 className="text-3xl">Educational Qualification:</h3>
            <div class="overflow-x-auto lg:w-full w-[350px]">
              <table class="table lg:w-full ">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th></th>
                    <th>DEGREE</th>
                    <th>VERITY/COLLEGE</th>
                    <th>PASSING YEAR</th>
                    <th>RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>SSC</td>
                    <td>KASOM ALI NATIONAL IDEAL SCHOOL</td>
                    <td>2018</td>
                    <td>5.00</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>DIPLOMA IN ENGINEERING IN EEE</td>
                    <td>GAZIPUR IDEAL POLYTECHNICS INSTITUTE</td>
                    <td>2022</td>
                    <td>3.90</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-3xl my-3">List of skill:</h3>
            <p>1. HTML</p>
            <p>2.CSS</p>
            <p>3.JAVASCRIPT</p>
            <p>4.REACT</p>
            <p>5.BOOTSTRAP</p>
            <p>6.TAILWIND CSS</p>
            <p>7.NODE JS</p>
            <p>8.EXPRESS JS</p>
            <p>9.MONGODB</p>

            <h3 className="lg:text-3xl text-xl my-3">MY PROJECT LINK:</h3>
            <p>
              FRUIT SHOP:{" "}
              <a
                href="https://fruit-shop-8ea11.web.app/"
                className="btn btn-link"
              >
                https://fruit-shop-8ea11.web.app/
              </a>
            </p>
            <p>
              KH PHOTOGRAPHY:{" "}
              <a
                href="https://k-h-photography.web.app/"
                className="btn btn-link"
              >
                https://k-h-photography.web.app/
              </a>
            </p>
            <p className="text-sm">
              CONVENTION CENTER:{" "}
              <a
                href="https://hungry-kowalevski-caf2ef.netlify.app/"
                className="btn btn-link"
              >
                https://hungry-kowalevski-caf2ef.netlify.app/
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
