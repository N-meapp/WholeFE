import { useNavigate } from "react-router-dom";
import img from "../../assets/Images/products/shoeOne.png"
import { useState } from "react";
import { addToHistory } from "../../api/productApi";
import { useSelector } from "react-redux";
 
export default function ProductCards({ card }) {
  
console.log(card,'cardddd.......');

const user = useSelector((state) => state.user.user);


  

  const navigate = useNavigate()

  const handleOnclick = ()=>{
    console.log('heelloooo',card);
    
    addToHistory(user.token,card?.product_category)
    navigate('/product-details',{state:card})

  }

  return (
    <>
      <div onClick={()=>{
        handleOnclick()
      }} className="md:w-48 w-full h-full mb-6 md:mb-0  flex flex-col rounded-xl shadow-lg hover:shadow-none transition-all cursor-pointer bg-white">
        <img
  className="md:h-48 h-48 object-cover object-center rounded-t-xl"
  src={card?.product_images?.[0] || img}  // Use default image if undefined
  alt="Product"></img>

        <div className="bg-[#ffffff] rounded-b-xl w-full text-center content-center  md:h-32 p-2">
          <h1 className="font-bold text-sm md:text-lg text-[#535353] truncate">{card?.product_name}</h1>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {card?.prize_range?.length>1? (
              <h1 className="text-sm md:text-lg font-semibold">{`₹ ${card.prize_range[card?.prize_range?.length-1].prize} - ${card.prize_range[0].prize}`}</h1>
            ) : (
              <h1 className="text-sm md:text-lg font-semibold">{`₹ ${
                card.product_minprice ? card.product_minprice : card.product_maxprice
              }`}</h1>
            )}
            {/* <h1 className='line-through text-gray-500 font-semibold'>₹ 3500</h1> */}
          </div>

          <h1 className="text-sm md:text-lg font-semibold "><span className="text-xs text-[#e9cb22]">min. order :</span>{` ${card?.product_minOrder || 5}`}</h1>
        </div>
      </div>
    </>
  );
}
