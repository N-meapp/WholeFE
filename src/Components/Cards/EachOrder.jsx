export default function EachOrder({ order }) {
  return (
    <>
      <div className="w-full md:h-fit bg-white shadow-lg mx-auto rounded-xl mb-2 md:mb-10 md:p-5 p-3 ">
        <div className="flex flex-wrap md:flex-nowrap md:gap-0 gap-5">
          <div className="w-full md:w-3/4">
            <div className="flex flex-wrap gap-3 md:gap-6">
              {/* Items Box */}
              <div className="h-fit p-2 bg-gray-200 rounded-lg shadow-md text-gray-900 text-center">
                <h1 className="font-bold text-xl">6</h1>
                <h1 className="text-xs">items</h1>
              </div>
              {/* Item Details */}
              <div className="flex-1 min-w-[150px] content-center">
                <h1 className="font-bold text-md whitespace-break-spaces">
                  Nike Shoes,dseredf, aerwerf, dfidfif, sdeififif
                </h1>
              </div>
            </div>
            {/* Address and Date */}
            <div className="mt-8 flex flex-col gap-2">
              <h1 className="text-xs md:text-sm">1234 Street Name, City</h1>
              <h1 className="text-xs md:text-sm">Tue Jan 2025</h1>
              <h1 className="text-sm md:text-base">
                order Id: <span className="text-black font-bold">530Edfa</span>
              </h1>
              <h1 className="text-sm md:text-base">
                Amount to pay :{" "}
                <span className="text-[#ffffff] font-bold bg-[#21ab90] py-2 px-4 rounded-full">
                  50000 ₹
                </span>
              </h1>
              <h1 className="text-sm md:text-base text-[#4e4d4d] font-bold py-3 px-2 bg-[#ffffff] shadow-lg w-fit rounded-lg border-2 border-[#f7f5f5] mt-5">
                Delivered
              </h1>

              <div className="mt-16 relative md:hidden block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="size-6 absolute -top-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="size-6 absolute -top-2 right-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>

                <div className="items-center h-16 justify-center flex">
                  <div className="w-5 h-5 content-center items-center bg-[#21ab90] rounded-full"></div>
                  <div className="w-1/4 h-1 bg-[#21ab90]"></div>
                  <div className="w-5 h-5 bg-[#21ab90] rounded-full"></div>
                  <div className="w-1/4 h-1 bg-[#e9e8e8]"></div>
                  <div className="w-5 h-5 bg-[#e9e8e8] rounded-full"></div>
                  <div className="w-1/4 h-1 bg-[#e9e8e8]"></div>
                  <div className="w-5 h-5 bg-[#e9e8e8] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 md:text-base text-sm justify-center">
            <button className="px-4 py-2 bg-[#1d7691] hover:bg-[#000000] shadow-md text-white rounded-full w-full transition-all">
              View
            </button>
            <button className="px-4 py-2 bg-[#eeeded] hover:bg-[black] hover:text-white shadow-md text-[black] rounded-full w-full transition-all">
              Edit
            </button>
            <button className="px-4 py-2 bg-[#f89999] text-[#ffffff] rounded-full w-full border-[#ff5a5442] shadow-md border transition-all hover:text-white">
              Cancel
            </button>
          </div>
        </div>
        <div className="mt-16 relative md:block hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-6 absolute -top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="size-6 absolute -top-2 right-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>

          <div className="items-center h-16 justify-center flex">
            <div className="w-5 h-5 content-center items-center bg-[#21ab90] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#21ab90]"></div>
            <div className="w-5 h-5 bg-[#21ab90] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#e9e8e8]"></div>
            <div className="w-5 h-5 bg-[#e9e8e8] rounded-full"></div>
            <div className="w-1/4 h-1 bg-[#e9e8e8]"></div>
            <div className="w-5 h-5 border-2 border-green rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
