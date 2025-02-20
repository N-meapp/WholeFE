// <<<<<<< sub

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Home from './Pages/User/Home';
// import Navbar from './Layout/User/Navbar';
// import Footer from './Layout/User/Footer';
// import ProductDetails from './Pages/User/ProductDetails';
// import Cart from './Pages/User/Cart';
// import AdminHome from './admin/Pages/Home/AdminHome';
// import AdminLogin from './admin/Pages/AdminLogin/AdminLogin';

// function App() {
//   return (
//     <Router>
//       <Content />
//     </Router>
//   );
// }

// function Content() {
//   let location = useLocation();

//   return (
//     <>
 
//       {location.pathname !== '/admin' && location.pathname !== '/admin_login' && <Navbar />}
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/product-details" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/admin" element={<AdminHome />} />
//         <Route path="/admin_login" element={<AdminLogin />} />
//         {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
//       </Routes>


//       {location.pathname !== '/admin' && location.pathname !== '/admin_login' && <Footer />}
// =======





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
// import Dashboard from './Pages/Admin/Dashboard'

function App() {
  const user = useSelector((state) => state.user.user);

  console.log(user, "uuuseeerrr");

  return (
    <>

      {user?.token && user?.user ?

      <>
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
      </>:
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </>
      }

    </>
  );
}

export default App;

