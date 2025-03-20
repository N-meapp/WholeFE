
import { useEffect } from "react";
import CategorySuggestions from "../../Layout/User/CategorySuggestions";
import ListAllProducts from "../../Layout/User/ListAllProducts";
import OfferSlider from "../../Layout/User/OfferSlider";
import OffersTopRatedNewArrival from "../../Layout/User/OffersTopRatedNewArrival";
import ProductsHorizontalSlider from "../../Layout/User/ProductHorizontalSlider";
import SuggestedProducts from "../../Layout/User/SuggestedProducts";

export default function Home(){

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });

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