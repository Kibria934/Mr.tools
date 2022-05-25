import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import UseAdmin from "../../Hook/UseAdmin"
import Loading from "../../SharedPage/Loading";

const Dashboard = () => {

  const [user] = useAuthState(auth);
  const [admin,adminLoading] = UseAdmin(user);
  console.log(admin);
  if(Loading,adminLoading){
    <Loading/>
  }
  return (
    <div className="mt-16 ">
      <div class="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center ">
          <h1 className="text-center text-5xl text-secondary font-bold my-10"></h1>
          <Outlet></Outlet>

        </div>
        <div class="drawer-side fixed h-screen">
          <label for="my-drawer-2" class="drawer-overlay "></label>
          <ul class="menu p-4 sticky top-0 py-6  overflow-y-auto w-80 bg-base-300 text-base-content">
            <li>
              <NavLink to="/dashboard/myOrders">My Order</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myReview">Add Review</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myProfile">My Profile</NavLink>
            </li>
            { admin && <li>
              <NavLink to="/dashboard/makeAdmin">Make Admin</NavLink>
            </li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
