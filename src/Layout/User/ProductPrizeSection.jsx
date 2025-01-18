import PrizeRange from "../../Components/Buttons/PrizeRange";

export default function ProductPrizeSection({card}){
    return(
        <>
            <div className="w-2/5 h-fit rounded-xl shadow-xl bg-[#ffffff] p-12">
            <h1 className="font-semibold text-xl mb-5 text-[#4e4e4e]">
              {card.name}
            </h1>
            <div className="w-full h-auto flex gap-5 justify-center flex-wrap">
              {card?.prizeRange?.map((range) => {
                return (
                  <>
                    <PrizeRange range={range} />
                  </>
                );
              })}
            </div>
            <div className="h-56 w-full  border-y-2 mt-10 py-8">
              <h1 className="text-xs font-semibold">
                Total -{" "}
                <span className="py-3 px-5 text-white font-semibold rounded-full bg-green-400">
                  {card.stock} Pieces
                </span>{" "}
              </h1>
            </div>
            <div className="w-full h-auto flex gap-5 justify-end mt-10">
              <button className="py-3 px-5 border-[#ff5a5442] border-[2px] text-black rounded-full font-bold flex w-fit gap-3 items-center">
                <h1>Send Inquiry</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
              <button className="py-3 px-5 bg-[#ff5a54] text-white rounded-full font-bold flex w-fit gap-3 items-center">
                <h1>Add to cart</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </>
    )
}