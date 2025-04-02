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
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Pages/User/Login";
import ProductsList from "./Pages/User/ProductsList";
import OrderList from "./Pages/User/OrderList";
import { useSelect } from "@material-tailwind/react";
import CategoryList from "./Pages/User/CategoryList";
import { getUser } from "./api/userApi";
import BlockModal from "./Components/Modal/BlockModal";
import LandingPage from "./Layout/User/LandingPage";
import { HomeContext } from "./main";

function App() {
  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  const {isHomePage,setIsHomePage} = useContext(HomeContext)
  const [data, setData] = useState();
  const [isBlocked, setIsBlocked] = useState();
  const path = window.location.pathname;

  // const admin = true;

  const checkIsUserBlocked = () => {
    if (user?.token && user?.user) {
      getUser(setData, user.token).then((res) => {
        setIsBlocked(res.status);
      });
    }
  };


  
  useEffect(() => {
    checkIsUserBlocked();
  }, []);

  return (
    <>
      {path.includes("admin") ? (
        <Router>
          <Routes>
            {admin?.token && admin?.admin ? (
              <>
                <Route path="/admin_dashboard" element={<AdminHome />} />
                <Route
                  path="*"
                  element={<Navigate to="/admin_dashboard" replace />}
                />
              </>
            ) : (
              <>
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </>
            )}
          </Routes>
        </Router>
      ) : isBlocked ? (
        <BlockModal />
      ) : user?.token && user?.user ? (
        <Router>

        {isHomePage?
          <LandingPage />
        :
        null}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/list" element={<ProductsList />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/category-list" element={<CategoryList />} />
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
