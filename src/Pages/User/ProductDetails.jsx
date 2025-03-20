import { useLocation } from "react-router-dom";


import { useEffect } from "react";
import ProductDetailingSection from "../../Layout/User/ProductDetailingSection";

export default function ProductDetails() {

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });

  },[])

  const location = useLocation();

  const card = location.state || {};

  return (
    <>
      <ProductDetailingSection card={card} />
    </>
  );
}
