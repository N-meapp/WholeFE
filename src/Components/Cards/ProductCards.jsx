import { useNavigate } from "react-router-dom";
import img from "../../assets/Images/products/shoeOne.png";
import { useState } from "react";
import { addToHistory } from "../../api/productApi";
import { useSelector } from "react-redux";

export default function ProductCards({ card }) {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleOnclick = () => {

    addToHistory(user.token, card?.product_category);
    navigate("/product-details", { state: card });
  };

  return (
    <>
    
      <div
        onClick={() => {
          handleOnclick();
        }}
        className="md:w-56  h-full md:mb-0  flex flex-col rounded-xl shadow-lg hover:shadow-none transition-all cursor-pointer bg-[#ffffff] p-2"
      >
        <img
          className="md:h-48 h-40 object-cover object-center rounded-xl"
          src={card?.product_images?.[0] || img} // Use default image if undefined
          alt="Product"
        ></img>

        <div className="bg-[#ffffff] rounded-b-xl w-full text-center content-center  md:h-32 p-2 flex flex-col gap-2">
          <h1 className=" text-sm md:text-lg text-[#535353] truncate">
            {card?.product_name}
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center whitespace-break-spaces">
            {card?.prize_range?.length>1? (
              <h1 className="text-xl md:text-lg font-semibold">{`₹ ${card.prize_range[card?.prize_range?.length-1].rate} - ${card.prize_range[0].rate}`}</h1>
            ) : (
              <h1 className="text-lg md:text-lg font-semibold">{`₹ ${
                card.prize_range[0].rate
              }`}<span className="font-light text-sm">/pce</span></h1>
            )}
          </div>

          <h1 className="text-sm md:text-lg font-semibold ">
            <span className="text-xs text-[#e9cb22]">min. order :</span>
            {` ${card?.product_minOrder || 5}`}
          </h1>
        </div>
        <button className="w-full py-2 bg-[#f1f1f1] rounded-xl font-bold text-xs flex gap-2 items-center justify-center transition-all hover:text-white hover:bg-[#4d4c4c]">
          <h1>Add to </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
