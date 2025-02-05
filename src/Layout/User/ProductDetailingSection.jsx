import ProductImageSection from "./ProductImageSection";
import ProductpriceSection from "./ProductPriceSection";

export default function ProductDetailingSection({card}){
    return(
        <>
        <div className="w-full pt-36 h-auto">
        <div className="w-[90%] mx-auto md:px-10 px-5 md:pt-10 pt-5 h-auto md:mt-14 mt-2 pb-20 bg-[#bebebe1c] rounded-xl items-center md:flex gap-6">
          <ProductImageSection card={card} />
          <ProductpriceSection card={card} />
        </div>
      </div>
        </>
    )
}