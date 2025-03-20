export default function EachOfferCarousel({imgSrc}) {
  return (
    <>
      <img
        src={imgSrc}
        alt={imgSrc}
        className="h-96 w-full object-cover"
      />
    </>
  );
}
