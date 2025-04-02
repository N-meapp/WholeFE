import { useLocation } from "react-router-dom";


import { useContext, useEffect } from "react";
import ProductDetailingSection from "../../Layout/User/ProductDetailingSection";
import { HomeContext } from "../../main";

export default function ProductDetails() {

    const { isHomePage, setIsHomePage } = useContext(HomeContext);
  

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsHomePage(false)
  },[])

  const location = useLocation();

  const card = location.state || {};

  return (
    <>
      <ProductDetailingSection card={card} />
    </>
  );
}
