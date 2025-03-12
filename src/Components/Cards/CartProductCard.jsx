import { useState } from "react";
import PriceRange from "../Buttons/PrizeRange";
import CountInput from "../Inputs/CountInput";

export default function CartProductCard({ item,countPriceArray, setCountPriceArray , handleSetArray }) {
  const [count, setCount] = useState(item.total_count);
  


  return (
    <>
      <div className="w-full h-full md:h-auto md:bg-[#eee8e8] border-2 border-[#ffffff85] md:mb-0 mb-10 md:border-none md:mt-10 mt-2 rounded-xl md:p-4 relative ">
        <div className="flex md:gap-8 gap-2">
          <img
            src={item.product_images[0]}
            className="md:h-24 h-20 mt-3 ml-3 rounded-xl"
          ></img>
          <div className="w-full self-center">
            <div className=" h-full w-full md:w-[90%]">
              <h1 className="font-bold content-center text-base md:text-xl text-[#2e2e2e]">
                {item.product_name}
              </h1>
              {/* <h1 className="font-bold content-center text-base text-[#575454]">
              {item.description}
            </h1> */}
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:flex-row flex-col content-center flex gap-5 justify-center flex-wrap my-10">
          {item.prize_range?.map((range) => {
            return (
              <>
                <PriceRange range={range} />
              </>
            );
          })}
        </div>

        <CountInput count={count} setCount={setCount} productId={item?.product_id} countPriceArray={countPriceArray} setCountPriceArray={setCountPriceArray} priceRange={item.prize_range} handleSetArray={handleSetArray} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="md:size-8 size-5 absolute md:top-3 top-1 md:right-3 right-1 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>
        <button className="w-fit py-3 px-4 bg-[#ffffff] rounded-xl bottom-3 border ml-3 mb-3 mt-8 md:ml-0 md:mb-0 md:mt-0 md:absolute right-3  border-[#0000002d]">
          details
        </button>
      </div>
    </>
  );
}
