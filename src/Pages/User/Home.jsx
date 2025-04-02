
import { useContext, useEffect } from "react";
import CategorySuggestions from "../../Layout/User/CategorySuggestions";
import ListAllProducts from "../../Layout/User/ListAllProducts";
import OfferSlider from "../../Layout/User/OfferSlider";
import OffersTopRatedNewArrival from "../../Layout/User/OffersTopRatedNewArrival";
import ProductsHorizontalSlider from "../../Layout/User/ProductHorizontalSlider";
import SuggestedProducts from "../../Layout/User/SuggestedProducts";
import Navbar from "../../Layout/User/Navbar";
import Footer from "../../Layout/User/Footer";
import LandingPage from "../../Layout/User/LandingPage";
import { HomeContext } from "../../main";

export default function Home(){
    const {isHomePage,setIsHomePage} = useContext(HomeContext)
  

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsHomePage(true)

  },[])

    return(
        <>
        
      
          <OfferSlider />
          <CategorySuggestions />
          <ProductsHorizontalSlider />
          <OffersTopRatedNewArrival />
          <SuggestedProducts />
          <ListAllProducts />

        </>
    )
}