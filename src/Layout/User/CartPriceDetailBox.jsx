import { useContext, useEffect, useState } from "react";
import ConfirmOrderModal from "../../Components/Modal/ConfirmOrderModal";
import SuccessModal from "../../Components/Modal/SuccessModal";
import InvalidError from "../../Components/Modal/InvalidError";
import { clearCart, placeOrder, sendEnquiry } from "../../api/productApi";
import { useSelector } from "react-redux";
import HandleAddPlaceOrderAddress from "./HandleAddPlaceOrderAddress";
import SendEnquiryModal from "../../Components/Modal/SendEnquiryModal";

export default function CartpriceDetailBox({
  cart,
  bottomDifference,
  countPriceArray,
  setCountPriceArray,
  secondArray,
  setIsDeleted,
  setCart,
  setIsEmpty,
}) {
  const [isEqual, setIsEqual] = useState(false);
  const [cartItem, setCartItem] = useState(false);
  const [sum, setSum] = useState();

  const [isOrderConfirm, setIsOrderConfirm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const user = useSelector((state) => state.user.user);

  

  const handlePlaceOrder = () => {
    setIsOrderConfirm(true);
    setSum(calculateTotal());
  };

  const confirmOrder = (order) => {
    placeOrder(user.token, order, user.user).then((resultStatus) => {
      if (resultStatus) {
        setIsOrderConfirm(false);
        setIsOrder(true);
        setTimeout(() => {
          setIsOrder(false);
          setCart(null);
          setIsEmpty(true);
        }, 3000);
      } else {
        setIsError(true);
      }
    });
  };

  const checkStock = (count, price, stock) => {

    console.log(count,price,stock,'stockkk');
    

    if (count > stock) {
      return "NA";
    } else {
      return count * price;
    }
  };

  const calculateTotal = () => {
    let totalAmount = 0;

    for (let i = 0; i < countPriceArray?.length; i++) {

      if (countPriceArray[i].count <= countPriceArray[i].stock) {
        totalAmount =
          totalAmount + countPriceArray[i].count * countPriceArray[i].price;
      }
    }

    return totalAmount;
  };

  const handleClearCart = () => {


    clearCart(user.token).then((res) => {
      setIsDeleted(true);
    });
  };

  return (
    <>
      <div className="md:block hidden w-4/12 h-96"></div>
      <div
        className={`md:w-4/12 w-full h-auto  ${
          isEqual ? "md:absolute md:bottom-0" : "md:fixed"
        } right-[8%] `}
      >
        <div
          className={` bg-[#ffffff] h-auto rounded-xl flex flex-col py-10 gap-5 justify-between`}
          id="price-card"
        >
          <div>
            {countPriceArray?.map((item) => {
              return (
                <>
                  <div className="w-5/6 md:w-3/4 h-auto mx-auto mb-10 flex order-1 items-center">
                    <div className="w-1/2 h-full break-words content-center">
                      <h1 className="text-[black] font-bold text-start text-sm md:text-base truncate ">
                        {item.name}
                      </h1>
                    </div>
                    <div className="w-1/3 h-full content-center">
                      <h1 className="text-[#706f6f] font-bold text-end text-sm md:text-sm justify-self-center">
                        {item?.count} x {item?.price}
                      </h1>
                    </div>
                    <div className="w-1/3 h-full content-center">
                      <h1 className="text-[#000000bd] font-bold text-end text-sm md:text-base w-fit bg-[#f1f1f1] p-2 rounded-lg float-right shadow-md">
                        {checkStock(item?.count, item?.price, item?.stock)}
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="w-5/6 md:w-3/4 h-10 mx-auto  flex order-2">
              <div className="w-1/2 h-full">
                <h1 className="text-[#33856c] font-bold text-start">
                  Discount
                </h1>
              </div>
              <div className="w-1/2 h-full">
                <h1 className="text-[#33856c] font-bold text-end">
                  {cart?.discount_amount != 0 ? "-" : ""}{" "}
                  {cart?.discount_amount}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <hr className="w-[90%] mx-auto mb-5"></hr>
            <div className="w-5/6 md:w-3/4 h-10 mx-auto flex">
              <div className="w-1/2 h-full">
                <h1 className="text-[black] font-bold text-start text-base md:text-lg">
                  Total amount
                </h1>
              </div>
              <div className="w-1/2 h-full">
                <h1 className="text-[black] font-extrabold text-end text-base md:text-lg">
                  {calculateTotal()}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto p-6 rounded-xl shadow-xl bg-[#ffffff] mt-10">
          <div className="w-full h-auto md:flex gap-5 justify-between">
            <div className=" content-center mb-4 md:mb-0">
              <button
                onClick={() => {
                  handleClearCart();
                }}
                className="w-10 h-10 rounded-full bg-[#000000] items-center gap-2 hover:w-24 pl-2 hover:pr-3 transition-all flex duration-500 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>

                <h1 className="text-white group-hover:block hidden">Clear</h1>
              </button>
            </div>

            <div className="lg:flex lg:gap-5 justify-items-center">
              <button
                onClick={() => {
                }}
                className="py-3 px-5 border-[#ff5a5442] border-[2px] text-black rounded-full font-bold flex w-full justify-center md:w-fit mb-16 md:mb-0 gap-3 items-center"
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
      </div>
      <div className="md:hidden block px-6 md:relative sticky -mt-20 bottom-24">
        <button
          onClick={() => {
            handlePlaceOrder();
          }}
          className=" flex py-3 px-5 bg-[#ff5a54] text-white rounded-full font-bold w-full justify-center md:w-fit gap-3 items-center "
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
        price={sum}
        isSingleProduct={false}
      />
      <SuccessModal
        setOpenModal={setIsOrder}
        openModal={isOrder}
        message={"Order placed"}
        subMessage={"Order placed successfully!"}
      />
      <InvalidError setOpenModal={setIsError} openModal={isError} />
    </>
  );
}
