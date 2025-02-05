import { useEffect } from "react";
import CartProductCard from "../../Components/Cards/CartProductCard";

export default function CartProducts({ cart,setBottomDifference }) {

    // window.addEventListener('scroll',()=>{
    //     const bottomCard = document.getElementById('product-card')

    //     const divBottom = bottomCard.getBoundingClientRect().bottom;
    //     const viewportHeight = window.innerHeight;
    //     const difference = viewportHeight - divBottom;
    //     setBottomDifference(difference)
    //     // console.log(difference);
                
    
    // })



  return (
    <>
      <div className="md:w-7/12 w-full h-auto  gap-10" id="product-card">
        {cart.map((item) => {
          return <CartProductCard item={item} />;
        })}
      </div>
    </>
  );
}
