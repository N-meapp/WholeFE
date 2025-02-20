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




{/* <Router>
        {user?.token && user?.user ? <Navbar /> : null}
        <Routes>
          <Route
            path="/"
            element={user?.token && user?.user ? <Home /> : <Login />}
          />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/list" element={<ProductsList />} />
          <Route path="/order-list" element={<OrderList />} />
        </Routes>
        {user?.token && user?.user ? <Footer /> : null}
      </Router> */}