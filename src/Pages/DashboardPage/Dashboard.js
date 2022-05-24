import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="mt-16 ">
      <div class="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center ">
          <h1 className="text-center text-5xl text-secondary font-bold my-10">DASHBOARD</h1>
          <Outlet></Outlet>

        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 py-10 overflow-y-auto w-80 bg-base-300 text-base-content">
            <li>
              <NavLink to="/dashboard/myOrders">My Order</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myReview">Add Review</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
