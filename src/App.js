import { Route, Routes, useLocation } from "react-router-dom";
import RequireAdmin from "./Auth/RequireAdmin";
import RequireAuth from "./Auth/RequireAuth";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import Loading from "./SharedPage/Loading";
import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";

const Inventory = React.lazy(() => import("./Pages/HomePage/Inventory"));
const PaymentPage = React.lazy(() =>
  import("./Pages/DashboardPage/PaymentPage")
);
const ManageProducts = React.lazy(() =>
  import("./Pages/DashboardPage/Admin/ManageProducts")
);
const MangeAllOrders = React.lazy(() =>
  import("./Pages/DashboardPage/Admin/MangeAllOrders")
);
const AddProduct = React.lazy(() =>
  import("./Pages/DashboardPage/Admin/AddProduct")
);
const MakeAdmin = React.lazy(() =>
  import("./Pages/DashboardPage/Admin/MakeAdmin")
);
const AddReview = React.lazy(() => import("./Pages/DashboardPage/AddReview"));
const Purchase = React.lazy(() => import("./Pages/ParchasePage/Purchase"));
const NotFount = React.lazy(() => import("./SharedPage/NotFount"));
const Portfolio = React.lazy(() => import("./Pages/MyPortfolio/Portfolio"));
const Navbar = React.lazy(() => import("./SharedPage/Navbar"));
const Home = React.lazy(() => import("./Pages/HomePage/Home"));
const MyProfile = React.lazy(() => import("./Pages/DashboardPage/MyProfile"));
const MyOrder = React.lazy(() => import("./Pages/DashboardPage/MyOrder"));
const Dashboard = React.lazy(() => import("./Pages/DashboardPage/Dashboard"));
const Blogs = React.lazy(() => import("./Pages/BlogPage/Blogs"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const Login = React.lazy(() => import("./Auth/Login"));

function App() {
  const [user, loading, Autherror] = useAuthState(auth);
  console.log(loading);

  const location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
      <Navbar>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Routes
            location={!"/dashboard/manageAllProducts"}
            key={location.pathname}
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/portfolio" element={<Portfolio />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/purchase/:id"
              element={
                <RequireAuth>
                  <Purchase />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              {/* --------- nasted route----------- */}
              <Route path="myProfile" element={<MyProfile />}></Route>
              <Route path="payment/:id" element={<PaymentPage />}></Route>
              <Route path="myOrders" element={<MyOrder />}></Route>
              <Route path="myReview" element={<AddReview />}></Route>
              <Route
                path="addProduct"
                element={
                  <RequireAdmin>
                    <AddProduct />
                  </RequireAdmin>
                }
              ></Route>
              <Route
                path="makeAdmin"
                element={
                  <RequireAdmin>
                    <MakeAdmin />
                  </RequireAdmin>
                }
              ></Route>
              <Route
                path="manageProducts"
                element={
                  <RequireAdmin>
                    <ManageProducts />
                  </RequireAdmin>
                }
              ></Route>
              <Route
                path="manageAllProducts"
                element={
                  <RequireAdmin>
                    <MangeAllOrders />
                  </RequireAdmin>
                }
              ></Route>
            </Route>
            <Route path="*" element={<NotFount />}></Route>
          </Routes>
        </AnimatePresence>
        <Toaster id={"text"} />
      </Navbar>
    </Suspense>
  );
}

export default App;
