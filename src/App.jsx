import AdminHome from "./admin/Pages/Home/AdminHome";
import AdminLogin from "./admin/Pages/AdminLogin/AdminLogin";
import Home from "./Pages/User/Home";
import Navbar from "./Layout/User/Navbar";
import Footer from "./Layout/User/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetails from "./Pages/User/ProductDetails";
import Cart from "./Pages/User/Cart";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Pages/User/Login";
import ProductsList from "./Pages/User/ProductsList";
import OrderList from "./Pages/User/OrderList";
import { useSelect } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const accesshToken = localStorage.getItem("accessToken");

  console.log(accesshToken, "app.js access token");
  

  const path = window.location.pathname;
  // const admin = true;

  return (
    <>
 <ToastContainer />
      {path.includes("admin") ? (
        <Router>
          <Routes>
          {admin?.token && admin?.admin && accesshToken ?
          
          <>
          
            <Route path="/admin_dashboard" element={<AdminHome />} />
            <Route path="*" element={<Navigate to="/admin_dashboard" replace />} />    
          </>
            :
            <>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />    
            </>
            
          }
          </Routes>
        </Router>
      ) : user?.token && user?.user ? (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/list" element={<ProductsList />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

