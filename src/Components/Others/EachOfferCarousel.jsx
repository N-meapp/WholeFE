export default function EachOfferCarousel({imgSrc}) {

  const IMAGE_URL = import.meta.env.VITE_IMG_URL



  return (
    <>
      <img
        src={`${IMAGE_URL}${imgSrc?.slider_image}`}
        alt={IMAGE_URL}
        className="h-32 md:h-96 w-full object-cover"
      />
    </>
  );
}
