import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "./Loading";

const Navbar = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      <Loading />;
    }
    console.log(user);
  }, []);

  return (
    <div className="drawer drawer-end ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar shadow-lg fixed top-0 z-50 lg:px-20 bg-base-100">
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              tabIndex="0"
              for="dashboard-drawer"
              className="btn btn-ghost lg:hidden btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          {/* )} */}
          <div className="flex-1 text-3xl font-semibold tracking-widest px-2 mx-2">
            <Link to={"/"}>Mr.tools</Link>
          </div>
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal font-semibold text-xl gap-4">
              {/* <!-- Navbar menu content here --> */}
              <li>
                <NavLink className="rounded-lg " to={"/"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="rounded-lg" to={"/portfolio"}>
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink className="rounded-lg" to={"/blogs"}>
                  Blogs
                </NavLink>
              </li>
             {user&& <li>
                <Link className="rounded-lg" to={"/dashboard/myOrders"}>
                  Dashboard
                </Link>
              </li>}
              <li>
                {user ? (
                  <span
                    onClick={() => {
                      signOut(auth);
                      localStorage.removeItem("accessToken");
                    }}
                    className="rounded-lg"
                  >
                    Signout
                  </span>
                ) : (
                  <NavLink className="rounded-lg btn btn-outline btn-secondary" to={"/login"}>
                    Login
                  </NavLink>
                )}
              </li>
              {user && (
                <li>
                  <span className="rounded-lg">{user?.displayName}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto font-semibold text-xl w-80 bg-base-100">
          {/* -- Sidebar content here --> */}
          <li>
            <NavLink className="rounded-lg " to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="rounded-lg" to={"/portfolio"}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink className="rounded-lg" to={"/blogs"}>
              Blogs
            </NavLink>
          </li>
       {  user&& <li>
            <Link className="rounded-lg" to={"/dashboard/myOrders"}>
              Dashboard
            </Link>
          </li>}
          <li>
            {user ? (
              <span
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  signOut(auth);
                }}
                className="rounded-lg"
              >
                Signout
              </span>
            ) : (
              <NavLink className="rounded-lg btn btn-outline btn-secondary" to={"/login"}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
