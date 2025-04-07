import { useNavigate } from "react-router-dom";
import img from "../../assets/Images/products/shoeOne.png"
import { useState } from "react";
import { useSelector } from "react-redux";
import { addToHistory } from "../../api/productApi";
 
export default function SlidingProductsCard({ card }) {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate()

  const handleOnclick = ()=>{
    addToHistory(user.token,card?.product_category)
    navigate('/product-details',{state:card})
  }

  return (
    <>
      <div onClick={()=>{
        handleOnclick()
      }} className="md:w-48 w-48 h-full md:mb-0  flex flex-col rounded-xl shadow-lg hover:shadow-none transition-all cursor-pointer bg-[#ffffff] p-2">
        <img
  className="md:h-48 h-40 object-cover object-center rounded-xl"
  src={card?.product_images?.[0] || img}  // Use default image if undefined
  alt="Product"></img>

        <div className="bg-[#ffffff] rounded-b-xl w-full text-center content-center  md:h-32 p-2 flex flex-col gap-2">
          <h1 className=" text-sm md:text-lg text-[#535353] truncate">{card?.product_name}</h1>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center whitespace-break-spaces">
            {card?.prize_range?.length>1? (
              <h1 className="text-xl md:text-lg font-semibold">{`₹ ${card.prize_range[card?.prize_range?.length-1].rate} - ${card.prize_range[0].rate}`}</h1>
            ) : (
              <h1 className="text-lg md:text-lg font-semibold">{`₹ ${
                card.prize_range[0].rate
              }`}<span className="font-light text-sm">/pce</span></h1>
            )}
          </div>

          <h1 className="text-sm md:text-lg font-semibold "><span className="text-xs text-[#e9cb22]">min. order :</span>{` ${card?.product_minOrder || 5}`}</h1>
        </div>
      </div>

      

    </>
  );
}
