import { useState } from "react";
import { cart } from "../../constants/cards";
import CartProducts from "../../Layout/User/CartProducts";
import CartpriceDetailBox from "../../Layout/User/CartPriceDetailBox";

export default function Cart({}){

const [bottomDifference,setBottomDifference] = useState()

    return(
        <>

        <div className="w-full md:pt-36 pt-28">
                <div className="w-[90%] mx-auto md:px-10 px-2 md:pt-10 pt-2 md:mt-14 mt-2 pb-20 bg-[#bebebe1c] h-auto rounded-xl  md:flex gap-6">
                
                <CartProducts cart={cart} setBottomDifference={setBottomDifference} />
                <CartpriceDetailBox cart={cart} bottomDifference={bottomDifference} />

                
                </div>
              </div>
            
        </>
    )
}   