import { useEffect, useState } from "react";
import PriceRange from "../../Components/Buttons/PrizeRange";
import ConfirmOrderModal from "../../Components/Modal/ConfirmOrderModal";
import SuccessModal from "../../Components/Modal/SuccessModal";
import { useNavigate } from "react-router-dom";
import { placeOrder, sendEnquiry } from "../../api/productApi";
import TechnicalError from "../../Components/Modal/TechnicalError";
import InvalidError from "../../Components/Modal/InvalidError";
import CountInput from "../../Components/Inputs/CountInput";
import HandleAddPlaceOrderAddress from "./HandleAddPlaceOrderAddress";
import { useSelector } from "react-redux";
import SendEnquiryModal from "../../Components/Modal/SendEnquiryModal";
import { toast, ToastContainer } from "react-toastify";

export default function ProductpriceSection({ card, handleCart, handleOrder }) {
  const [isOrderConfirm, setIsOrderConfirm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isEnquiryClicked, setIsEnquiryClicked] = useState(false);

  console.log(card,'each product detail');
  

  const handlePlaceOrder = () => {
    if(price!==0){
      setPrice(findPrice(card));
      setIsOrderConfirm(true);
    }else{
      toast.error("Please try again.", {
        onClose: () => {
          // Handle any cleanup if needed
        },
      });
    }
  };


  const confirmOrder = (order) => {

    placeOrder(user.token, order, user.user).then((resultStatus) => {
      if (resultStatus) {
        setIsOrderConfirm(false);
        setIsOrder(true);


        setTimeout(() => {
          setIsOrder(false);
          // setCart(null);
          setIsEmpty(true);
        }, 3000);
      } else {
        setIsError(true);
      }
    });
  };

  const findPrice = (item) => {
    console.log(item,'setitemmm');
    

    let tempPrice = 0;
    for (let j = 0; j < item.prize_range.length; j++) {
      
      console.log(item.prize_range[j]);
      

      if (
        item.prize_range[j].from <= count &&
        count <= item.prize_range[j].to
      ) {
        tempPrice = item.prize_range[j].rate;

        // break;
      } else {
      }
    }
    console.log(tempPrice,count);
    
    return tempPrice * count;
  };

  const handleSetArray = (arr) => {
  };

  const handleSend = (message) => {
    sendEnquiry(user.token, card.id,message);
    
  };

  useEffect(()=>{

    setPrice(findPrice(card))

  },[count])

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
        <div className=" w-full  border-y-2 mt-10 py-8 flex-col flex gap-8">
          <div className="flex items-center gap-2">
            <h1 className="text-xs font-semibold">Total - </h1>
            <button className="py-3 px-5 text-xs text-white font-semibold rounded-full bg-green-400">
              {card.product_stock} Pieces
            </button>{" "}
          </div>
          <CountInput
            count={count}
            setCount={setCount}
            stock={card.product_stock}
            productId={card.id}
            handleSetArray={handleSetArray}
          />

<div className=" gap-2 flex items-center">
<h1 className="text-xs font-semibold">Amount to pay - </h1>

  <button className="py-2 px-4 border border-[#e7e7e7] font-bold rounded-full shadow-lg">₹ {price}</button>
</div>
        </div>
        <div className="w-full h-auto md:flex gap-5 justify-between mt-10">
          <div className=" content-center mb-4 md:mb-0">
            <button
              onClick={() => {
                handleCart(count);
              }}
              className="w-10 h-10 rounded-full bg-[#000000] items-center gap-2 hover:w-24 pl-2 hover:pr-3 transition-all flex duration-500 group"
            >
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
            <button
              onClick={() => {
                setIsEnquiryClicked(true);
              }}
              className="py-3 px-5 border-[#ff5a5442] border-[2px] text-black rounded-full font-bold flex w-full justify-center md:w-fit mb-10 md:mb-0 gap-3 items-center"
            >
              <h1>Send Enquiry</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
            <button
              onClick={() => {
                handlePlaceOrder();
              }}
              className="md:flex hidden py-3 px-5 bg-[#ff5a54] text-white rounded-full font-bold w-full justify-center md:w-fit gap-3 mt-5 lg:mt-0 items-center"
            >
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
        <button
          onClick={() => {
            handlePlaceOrder();
          }}
          className="flex py-3 px-5 bg-[#ff5a54] text-white rounded-full font-bold w-full justify-center md:w-fit gap-3 items-center "
        >
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
      <HandleAddPlaceOrderAddress
        setOpenModal={setIsOrderConfirm}
        openModal={isOrderConfirm}
        message={"Confirm order?"}
        subMessage={"You can modify it later if needed."}
        confirmOrder={confirmOrder}
        price={price}
        isSingleProduct={{ productId: card.id, count: count }}
      />

      <SuccessModal
        setOpenModal={setIsOrder}
        openModal={isOrder}
        message={"Order placed"}
        subMessage={"Order placed successfully!"}
      />
      <InvalidError setOpenModal={setIsError} openModal={isError} />

      <SendEnquiryModal
        openModal={isEnquiryClicked}
        setOpenModal={setIsEnquiryClicked}
        handleSend={handleSend}
        card={card}
      />
            <ToastContainer autoClose={2000} toastClassName="toast-blur" />

    </>
  );
}
