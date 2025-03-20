import { useEffect } from "react";
import CartProductCard from "../../Components/Cards/CartProductCard";
import { deleteCartProduct } from "../../api/productApi";

export default function CartProducts({ cart,setBottomDifference,countPriceArray, setCountPriceArray,handleSetArray,setIsItemDeleted }) {

  const handleDeleteCartProducts= async (productId,userId)=>{
    console.log(productId,userId,'thiisisisi');
    
    await deleteCartProduct(productId,userId).then((res)=>{
      
      if(res){
        setIsItemDeleted(true)
      }
    })

  }

  return (
    <>
      <div className="md:w-7/12 w-full h-auto  gap-10" id="product-card">
        {cart.map((item) => {
          return <CartProductCard item={item} countPriceArray={countPriceArray} setCountPriceArray={setCountPriceArray} handleSetArray={handleSetArray} handleDeleteCartProducts={handleDeleteCartProducts} />;
        })}
      </div>
    </>
  );
}
