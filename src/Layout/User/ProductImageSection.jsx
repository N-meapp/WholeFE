import ProductGallery from "../../Components/Gallery/ProductGallery";

export default function ProductImageSection({card}){
    return(
        <>
            <div className="md:w-3/5 w-full h-full text-center">
            <h1 className="font-bold md:text-lg text-base">
            {card.product_description}</h1>
            <div className="md:w-5/6 w-full mx-auto h-auto mt-10 md:p-10 pt-5 md:pb-5 pb-5 bg-[#eee8e8] justify-items-center rounded-xl">
              {/* <img className="h-full w-auto" src={card.image}></img> */}
              <ProductGallery gallery={card.product_images} />
            </div>
          </div>
        </>
    )
}