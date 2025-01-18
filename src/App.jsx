import Home from './Pages/User/Home'
import Navbar from './Layout/User/Navbar'
import Footer from './Layout/User/Footer'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductDetails from './Pages/User/ProductDetails'
import Cart from './Pages/User/Cart'
// import Dashboard from './Pages/Admin/Dashboard'


function App() {

  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} /> */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        
      </Routes>
    <Footer />
    </Router>
    </>
  )
}

export default App
