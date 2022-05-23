import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import RequireAdmin from "./Auth/RequireAdmin";
import RequireAuth from "./Auth/RequireAuth";
import Signup from "./Auth/Signup";
import Blogs from "./Pages/BlogPage/Blogs";
import AddReview from "./Pages/DashboardPage/AddReview";
import AddProduct from "./Pages/DashboardPage/Admin/AddProduct";
import MakeAdmin from "./Pages/DashboardPage/Admin/MakeAdmin";
import ManageProducts from "./Pages/DashboardPage/Admin/ManageProducts";
import MangeAllOrders from "./Pages/DashboardPage/Admin/MangeAllOrders";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import MyOrder from "./Pages/DashboardPage/MyOrder";
import MyProfile from "./Pages/DashboardPage/MyProfile";
import Home from "./Pages/HomePage/Home";
import Portfolio from "./Pages/MyPortfolio/Portfolio";
import Tools from "./Pages/Tools/Tools";
import Navbar from "./SharedPage/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import Purchase from "./Pages/ParchasePage/Purchase";

function App() {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/tools" element={<Tools />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/purchase" element={<Purchase />}></Route>
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
          <Route path="myOrders" element={<MyOrder />}></Route>
          <Route path="myReview" element={<AddReview/>}></Route>
          <Route path="addProduct" element={<AddProduct />}></Route>
          <Route path="makeAdmin" element={<MakeAdmin />}></Route>
          <Route path="manageProducts" element={<ManageProducts />}></Route>
          <Route path="manageAllOrders" element={<MangeAllOrders />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </Navbar>
  );
}

export default App;
