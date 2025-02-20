import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './Pages/User/Home';
import Navbar from './Layout/User/Navbar';
import Footer from './Layout/User/Footer';
import ProductDetails from './Pages/User/ProductDetails';
import Cart from './Pages/User/Cart';
import AdminHome from './admin/Pages/Home/AdminHome';
import AdminLogin from './admin/Pages/AdminLogin/AdminLogin';

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {
  let location = useLocation();

  return (
    <>
 
      {location.pathname !== '/admin' && location.pathname !== '/admin_login' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>


      {location.pathname !== '/admin' && location.pathname !== '/admin_login' && <Footer />}

    </>
  );
}

export default App;

