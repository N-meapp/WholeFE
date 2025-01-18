import ProductGallery from "../../Components/Gallery/ProductGallery";

export default function ProductImageSection({card}){
    return(
        <>
            <div className="w-3/5 h-full text-center">
            <h1 className="font-bold text-lg">{card.description}</h1>
            <div className="w-5/6 mx-auto h-auto mt-10 p-10 bg-[#eee8e8] justify-items-center rounded-xl">
              {/* <img className="h-full w-auto" src={card.image}></img> */}
              <ProductGallery gallery={card.images} />
            </div>
          </div>
        </>
    )
}