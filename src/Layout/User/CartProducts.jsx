import { useEffect } from "react";
import CartProductCard from "../../Components/Cards/CartProductCard";

export default function CartProducts({ cart,setBottomDifference,countPriceArray, setCountPriceArray,handleSetArray }) {

  return (
    <>
      <div className="md:w-7/12 w-full h-auto  gap-10" id="product-card">
        {cart.map((item) => {
          return <CartProductCard item={item} countPriceArray={countPriceArray} setCountPriceArray={setCountPriceArray} handleSetArray={handleSetArray} />;
        })}
      </div>
    </>
  );
}
