import { useSelector } from "react-redux";
import { addToCart, placeOrder } from "../../api/productApi";
import ProductImageSection from "./ProductImageSection";
import ProductpriceSection from "./ProductPriceSection";

export default function ProductDetailingSection({card}){

  const user = useSelector((state) => state.user.user);

  
  const handleCart = () =>{
    addToCart(card,user.token)
  }

  const handleOrder = () =>{
    placeOrder()
  }
  
    return(
        <>
        <div className="w-full pt-36 h-auto">
        <div className="w-[90%] mx-auto md:px-10 md:pt-10 pt-5 h-auto md:mt-14 mt-2 pb-20 md:bg-[#bebebe1c] rounded-xl items-center md:flex gap-6">
          <ProductImageSection card={card} />
          <ProductpriceSection card={card} handleCart={handleCart} placeOrder={placeOrder} />
        </div>
      </div>
        </>
    )
}