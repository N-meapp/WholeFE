import { useState } from "react";
import PriceRange from "../../Components/Buttons/PrizeRange";
import ConfirmOrderModal from "../../Components/Modal/ConfirmOrderModal";
import SuccessModal from "../../Components/Modal/SuccessModal";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../api/productApi";

export default function ProductpriceSection({ card,handleCart,placeOrder }) {

  const [isOrderConfirm,setIsOrderConfirm] = useState(false)
  const [isOrder,setIsOrder] = useState(false)
  const navigate = useNavigate()

  const handlePlaceOrder = ()=>{
    console.log('clickedd');
    
    setIsOrderConfirm(true)
  }

  const confirmOrder = () => {

    placeOrder()
    
    setIsOrder(true)

    setTimeout(() => {
      setIsOrder(false)

      navigate('/')
      
    },3000);

  };

  return (
    <>
      <div className="md:w-2/5 h-fit md:mt-0 mt-8 rounded-xl shadow-xl bg-[#ffffff] p-12">
        <h1 className="font-semibold text-xl mb-5 text-[#4e4e4e]">
          {card.product_name}
        </h1>
        <div className="w-full h-auto flex gap-5 justify-center flex-wrap">
          {card?.prize_range?.map((range) => {
            return (
              <>
                <PriceRange range={range} />
              </>
            );
          })}
        </div>
        <div className="h-56 w-full  border-y-2 mt-10 py-8">
          <h1 className="text-xs font-semibold">
            Total -{" "}
            <span className="py-3 px-5 text-white font-semibold rounded-full bg-green-400">
              {card.product_stock} Pieces
            </span>{" "}
          </h1>
        </div>
        <div className="w-full h-auto md:flex gap-5 justify-between mt-10">
          <div className=" content-center mb-4 md:mb-0">
            <button onClick={()=>{
              handleCart()
            }} className="w-10 h-10 rounded-full bg-[#000000] items-center gap-2 hover:w-24 pl-2 hover:pr-3 transition-all flex duration-500 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>

              <h1 className="text-white group-hover:block hidden">cart</h1>
            </button>
          </div>

          <div className="lg:flex gap-5 justify-items-center">
            <button className="py-3 px-5 border-[#ff5a5442] border-[2px] text-black rounded-full font-bold flex w-full justify-center md:w-fit mb-10 md:mb-0 gap-3 items-center">
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
            <button onClick={()=>{
              handlePlaceOrder()
            }} className="md:flex hidden py-3 px-5 bg-[#ff5a54] text-white rounded-full font-bold w-full justify-center md:w-fit gap-3 mt-5 lg:mt-0 items-center">
              <h1>Place order</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden block px-12 md:relative sticky -mt-20 bottom-24">

      <button onClick={()=>{
              handlePlaceOrder()
            }} className="flex py-3 px-5 bg-[#ff5a54] text-white rounded-full font-bold w-full justify-center md:w-fit gap-3 items-center ">
              <h1>Place order</h1>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
      </div>
      <ConfirmOrderModal 
      setOpenModal={setIsOrderConfirm}
        openModal={isOrderConfirm}
        message={"Confirm order?"}
        subMessage={"You can modify it later if needed."}
        confirmOrder={confirmOrder} />
        <SuccessModal 
        setOpenModal={setIsOrder}
        openModal={isOrder}
        message={"Order placed"}
        subMessage={"Order placed successfully!"}
         />
    </>
  );
}
