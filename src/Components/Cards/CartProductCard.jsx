import { useState } from "react";
import PriceRange from "../Buttons/PrizeRange";

export default function CartProductCard({ item }) {
  const [count, setCount] = useState(0);

  console.log("item:  ;", item.product.priceRange);

  const handleCount = (action) => {
    if (action == "minus") {
      if (count != 0) {
        setCount((count) => {
          return +count - 1;
        });
      }
    } else {
      setCount((count) => {
        return +count + 1;
      });
    }
  };

  function isNumericString(str) {
    // The ^\d+$ regex matches strings that contain only digits (0-9) from start to end.
    if (str) {
      return /^\d+$/.test(str);
    }
  }

  const handleOnchange = (value) => {
    const status = isNumericString(value);

    if (status) {
      setCount(value);
      console.log("hahhahahha");
    } else if (!value) {
      setCount(value);
    }
  };

  return (
    <>
      <div className="w-full h-full md:h-auto md:bg-[#eee8e8] border-2 border-[#ffffff85] md:mb-0 mb-10 md:border-none md:mt-10 mt-2 rounded-xl md:p-4 relative ">
        <div className="flex md:gap-8 gap-2">
          <img
            src={item.product.images[0]}
            className="md:h-24 h-20 mt-3 ml-3 rounded-xl"
          ></img>
          <div className="w-full self-center">
            <div className=" h-full w-full md:w-[90%]">
              <h1 className="font-bold content-center text-base md:text-xl text-[#2e2e2e]">
                {item.product.name}
              </h1>
              {/* <h1 className="font-bold content-center text-base text-[#575454]">
              {item.product.description}
            </h1> */}
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:flex-row flex-col content-center flex gap-5 justify-center flex-wrap my-10">
          {item.product.priceRange?.map((range) => {
            return (
              <>
                <PriceRange range={range} />
              </>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mb-3">
          <div
            onClick={() => {
              handleCount("minus");
            }}
            className="md:w-14 md:h-14 w-10 h-10 bg-[#ffffff] shadow-md rounded-full content-center justify-items-center cursor-pointer hover:shadow-none select-none md:hover:w-[3.2rem] md:hover:h-[3.2rem] hover:bg-[#ffffff] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="md:size-8 size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            onChange={(e) => {
              handleOnchange(e.target.value);
            }}
            className="rounded-full w-36 bg-[#ffffff00] text-black font-semibold px-5 text-center border-[#1b1b1b6c] border-[1px]"
            value={count}
          ></input>
          <div
            onClick={() => {
              handleCount("plus");
            }}
            className="md:w-14 md:h-14 w-10 h-10 bg-[#ffffff] shadow-md rounded-full content-center justify-items-center cursor-pointer hover:shadow-none md:hover:w-[3.2rem] md:hover:h-[3.2rem] select-none hover:bg-[#ffffff] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="md:size-8 size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
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
