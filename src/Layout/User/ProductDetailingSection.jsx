import { useSelector } from "react-redux";
import { addToCart, placeOrder } from "../../api/productApi";
import ProductImageSection from "./ProductImageSection";
import ProductpriceSection from "./ProductPriceSection";
import { useState } from "react";
import SuccessModal from "../../Components/Modal/SuccessModal";

export default function ProductDetailingSection({card}){

  const user = useSelector((state) => state.user.user);
  const [isAdded,setIsAdded] = useState(false)

  
  const handleCart = (count) =>{
    addToCart(card.id,count,user.token).then((res)=>{
      if(res){
        console.log(res,'rrrreess');
        
        setIsAdded(true)
        setTimeout(() => {
          setIsAdded(false)
        }, 2000);
      }else{
        setIsAdded(false)
      }
    })

  }

  const handleOrder = () =>{
    console.log(card,'hahahahaahhaah');
    
    const resStatus = placeOrder(user.token,card,user.user)
    console.log(resStatus,'res-status');
    return resStatus
  }
  
    return(
        <>
        <div className="w-full pt-36 h-auto">
        <div className="w-[90%] mx-auto md:px-10 md:pt-10 pt-5 h-auto md:mt-14 mt-2 pb-20 md:bg-[#bebebe1c] rounded-xl items-center md:flex gap-6">
          <ProductImageSection card={card} />
          <ProductpriceSection card={card} handleCart={handleCart} handleOrder={handleOrder} />
          <SuccessModal
            setOpenModal={setIsAdded}
            openModal={isAdded}
            message={"Successfully added!"}
            subMessage={"Place the order from cart section"}
          />
        </div>
      </div>
        </>
    )
}