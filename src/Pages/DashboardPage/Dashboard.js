import React, { Suspense, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import UseAdmin from "../../Hook/UseAdmin";
import Loading from "../../SharedPage/Loading";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = UseAdmin(user);

  return (
    <Suspense fallback={<Loading />}>
      <div className="drawer mt-16 drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-center ">
          <h1 className="text-center text-5xl text-secondary font-bold my-5"></h1>
          <motion.div
            className="mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            exit={{ x: window.innerWidth }}
            transition={{ duration: 0.2 }}
          >
            <Outlet></Outlet>
          </motion.div>
        </div>
        <div className="drawer-side static lg:fixed h-screen">
          <label htmlFor="my-drawer-2" className="drawer-overlay "></label>

          <ul className="menu p-4 py-6 overflow-y-auto w-64 bg-base-300 text-base-content">
            {!admin && (
              <li>
                <NavLink to="/dashboard/myOrders">My Order</NavLink>
              </li>
            )}
            {!admin && (
              <li>
                <NavLink to="/dashboard/myReview">Add Review</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/dashboard/myProfile">My Profile</NavLink>
            </li>
            {admin && (
              <li>
                <NavLink to="/dashboard/makeAdmin">Make Admin</NavLink>
              </li>
            )}
            {admin && (
              <li>
                <NavLink to="/dashboard/addProduct">Add Products</NavLink>
              </li>
            )}
            {admin && (
              <li>
                <NavLink to="/dashboard/manageProducts">
                  Manage Products
                </NavLink>
              </li>
            )}
            {admin && (
              <li>
                <NavLink to="/dashboard/manageAllProducts">
                  Manage All Products
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
