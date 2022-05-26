import React from 'react';
import me from '../../Assets/images/me.JPG'



const Portfolio = () => {
    return (
        <div className='mt-28'>
            <div class="hero lg:min-w-sm min-h-full  my-20">
        <div class="hero-content min-w-[90vw] bg-base-200  flex-col ">
          <img
            src={me}
            class="max-w-[50%] lg:w-[20%] mt-[-200px] border-emerald-200 border-2 rounded-full shadow-2xl"
            alt=""
          />
          <div className="w-full px-6">
            <h1 class="text-5xl text-left  font-bold">Md.Kibria Hossain</h1>
            <p class="text-xl text-left my-2 ">kibriahossain934@gmail.com</p>
            </div></div></div>
        </div>
    );
};

export default Portfolio;