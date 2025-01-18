import ProductImageSection from "./ProductImageSection";
import ProductPrizeSection from "./ProductPrizeSection";

export default function ProductDetailingSection({card}){
    return(
        <>
        <div className="w-full pt-36 h-screen ">
        <div className="w-[90%] mx-auto px-10 pt-10 h-auto mt-14 pb-20 bg-[#bebebe1c] rounded-xl items-center flex gap-6">
          <ProductImageSection card={card} />
          <ProductPrizeSection card={card} />
        </div>
      </div>
        </>
    )
}