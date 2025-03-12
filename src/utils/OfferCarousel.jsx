import { Carousel } from "@material-tailwind/react";
import offerImageOne from "../assets/Images/offers/offer-five.jpg"
import offerImageTwo from "../assets/Images/offers/offer-four.jpg"
import offerImageThree from "../assets/Images/offers/offer-three.png"
 
export default function OfferCarusel() {
  return (
    <Carousel autoplay={true} loop={true} autoplayDelay={4000} navigation={false} className="rounded-xl w-[90%] mx-auto mt-14">
      <img
        src={offerImageOne}
        alt="image 1"
        className="h-96 w-full object-cover"
      />
      <img
        src={offerImageTwo}
        alt="image 2"
        className="h-96 w-full object-cover"
      />
      <img
        src={offerImageThree}
        alt="image 3"
        className="h-96 w-full object-cover"
      />
      <img
        src={offerImageOne}
        alt="image 1"
        className="h-96 w-full object-cover"
      />
      <img
        src={offerImageTwo}
        alt="image 2"
        className="h-96 w-full object-cover"
      />
      <img
        src={offerImageThree}
        alt="image 3"
        className="h-96 w-full object-cover"
      />
    </Carousel>
  );
}
