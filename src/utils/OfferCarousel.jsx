import { Carousel } from "@material-tailwind/react";
import offerImageOne from "../assets/Images/offers/offer-five.jpg"
import offerImageTwo from "../assets/Images/offers/offer-four.jpg"
import offerImageThree from "../assets/Images/offers/offer-three.png"
import { useEffect, useState } from "react";
import { fetchSliderAdds } from "../api/productApi";
import EachOfferCarousel from "../Components/Others/EachOfferCarousel";
 
export default function OfferCarusel() {

  const [adds,setAdds] = useState()

  useEffect(()=>{
    fetchSliderAdds(setAdds)
  },[])

  return (
    <Carousel autoplay={true} loop={true} autoplayDelay={4000} navigation={false} className="rounded-xl w-[90%] mx-auto mt-6">
      
      {/* {adds?.map((imgSrc)=>{
        return(
          <EachOfferCarousel imgSrc={imgSrc} />
        )
      })} */}

      <img
        src={offerImageOne}
        alt="image 2"
        className="h-32 md:h-96 w-full object-cover"
      />
      <img
        src={offerImageTwo}
        alt="image 2"
        className="h-32 md:h-96 w-full object-cover"
      />
      <img
        src={offerImageThree}
        alt="image 3"
        className="h-32 md:h-96 w-full object-cover"
      />
      <img
        src={offerImageOne}
        alt="image 1"
        className="h-32 md:h-96 w-full object-cover"
      />
      <img
        src={offerImageTwo}
        alt="image 2"
        className="h-32 md:h-96 w-full object-cover"
      />
      <img
        src={offerImageThree}
        alt="image 3"
        className="h-32 md:h-96 w-full object-cover"
      />
    </Carousel>
  );
}
