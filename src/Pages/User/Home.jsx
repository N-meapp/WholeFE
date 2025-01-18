
import CategorySuggestions from "../../Layout/User/CategorySuggestions";
import OfferSlider from "../../Layout/User/OfferSlider";
import OffersTopRatedNewArrival from "../../Layout/User/OffersTopRatedNewArrival";
import SuggestedProducts from "../../Layout/User/SuggestedProducts";

export default function Home(){
    return(
        <>
          <OfferSlider />
          <CategorySuggestions />
          <OffersTopRatedNewArrival />
          <SuggestedProducts />
        </>
    )
}