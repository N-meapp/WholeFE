import { useEffect, useState } from "react";
import OrderMap from "../Others/OrderMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import OrderStatusButton from "../Buttons/OrderStatusButton";
import OrderProductsModal from "../Modal/OrderProductsModal";
import { cancelOrder } from "../../api/productApi";
import { useSelector } from "react-redux";
import CancelOrder from "../Modal/CancelOrder";
import RecievedOrder from "../Modal/RecievedOrder";

export default function EachOrder({ order,setIsOrderCanceled }) {
  const user = useSelector((state) => state.user.user);
  const [orderStatus, setOrderStatus] = useState(order?.order_list?.order_track);
  const [isViewModal,setIsViewModal] = useState(false)
  const [isCancelClicked,setIsCancelClicked] = useState(false)
  const [isOrderRecieved,setisOrderRecieved] = useState(false)


  const displayNames = () => {
    let names = "";
    order.product_data.forEach((product, i) => {
      names = names + product.product_name;

      console.log(i);

      if (i !== order.product_data.length - 1) {
        names = names + ", ";
      }
    });

    return names;
  };

  useEffect(() => {
    const orderStatusArray = document.querySelectorAll(`.${orderStatus}`);

    for (let i = 0; i < orderStatusArray.length; i++) {
      orderStatusArray[i].classList.add("filling-box");
    }

    const orderMap = document.querySelectorAll(".filling-box");

    let i = 0;
    let interval = setInterval(() => {
      if (i < orderMap.length) {
        orderMap[i].classList.add("filled");
        i++;
      } else {
        clearInterval(interval); // Stops the interval
      }
    }, 500);
  });

  const handleCancelOrder = async ()=>{
    await cancelOrder(order?.order_list?.order_id,user.token).then(()=>{
      setIsOrderCanceled(true)
      setIsCancelClicked(false)
    })
  }

  const handleOrderRecieved = async () =>{

  }

  return (
    <>
      <div className={`w-full md:h-fit ${orderStatus=='rejected'?'bg-[#ffffff] text-[#c0c0c0]':'bg-[#ffffff] shadow-lg'}   mx-auto rounded-xl mb-2 md:mb-10 md:p-5 p-3 `}>
        <div className="flex flex-wrap md:flex-nowrap md:gap-0 gap-5">
          <div className="w-full md:w-3/4">
            <div className="flex flex-wrap gap-3 md:gap-6">
              {/* Items Box */}
              <div className="h-fit p-2 bg-gray-200 rounded-lg shadow-md text-gray-900 text-center">
                <h1 className="font-bold text-xl">
                  {order?.product_data?.length}
                </h1>
                <h1 className="text-xs">items</h1>
              </div>
              {/* Item Details */}
              <div className="flex-1 min-w-[150px] content-center">
                <h1 className="font-bold text-md whitespace-break-spaces">
                  {displayNames()}
                </h1>
              </div>
            </div>
            {/* Address and Date */}
            <div className="mt-8 flex flex-col gap-6">
              <h1 className="text-xs md:text-sm">
                {" "}
                {`${order?.order_list?.address?.postcode ?? ""} ${
                  order?.order_list?.address?.state ?? ""
                } ${order?.order_list?.address?.district ?? ""} ${
                  order?.order_list?.address?.city ?? ""
                } ${order?.order_list?.address?.housename ?? ""} ${
                  order?.order_list?.address?.roadname ?? ""
                }`.trim()}
              </h1>
              <h1 className="text-xs md:text-sm">{order?.order_list?.date}</h1>
              <h1 className="text-sm md:text-base">
                order Id:{" "}
                <span className={`${orderStatus=='rejected'?'text-[#c0c0c0]':'text-black'}  font-bold`}>
                  {order?.order_list?.order_id}
                </span>
              </h1>
              <h1 className="text-sm md:text-base">
                Amount to pay :{" "}
                <span className="text-[#ffffff] font-bold bg-[#21ab90] py-2 px-4 rounded-full">
                  {order?.order_list?.final_amount} ₹
                </span>
              </h1>

              <OrderStatusButton orderStatus={orderStatus} />

              {orderStatus !== "rejected" && orderStatus!=="pending" ? (
                <div className="md:hidden block">
                  <OrderMap status={orderStatus} />
                </div>
              ) : null}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 md:text-base text-sm justify-center">
            <button onClick={()=>{
              setIsViewModal(true)
            }} className="px-4 py-2 bg-[#1d7691] hover:bg-[#000000] shadow-md text-white rounded-full w-full transition-all">
              View
            </button>

            {orderStatus == "shipped" ? (
              <>
              <button onClick={()=>{
                setisOrderRecieved(true)
              }} className="px-4 py-2 bg-[#eeeded] hover:bg-[black] hover:text-white shadow-md text-[black] rounded-full w-full transition-all">
                Change
              </button>
              </>
            ) : null}
            {orderStatus == "null" ? (
              <button onClick={()=>{
                setIsCancelClicked(true)
              }} className="px-4 py-2 bg-[#f89999] text-[#ffffff] rounded-full w-full border-[#ff5a5442] shadow-md border transition-all hover:text-white">
                Cancel
              </button>
            ) : null}
            {orderStatus == "rejected" ? (
              <button className="px-4 py-2 bg-[#5c5c5c] text-[#ffffff] rounded-full w-full border-[#ff5a5442] shadow-md border transition-all hover:text-white">
                Delete
              </button>
            ) :  
            null}
          </div>
        </div>
        {orderStatus !== "rejected" && orderStatus!=="pending" ? (
          <div className="hidden md:block">
            <OrderMap status={orderStatus} />
          </div>
        ) : null}
      </div>
      <OrderProductsModal products={order?.product_data} orderId={order?.order_list?.order_id} openModal={isViewModal} setOpenModal={setIsViewModal} setIsOrderCanceled={setIsOrderCanceled} />
      <CancelOrder setOpenModal={setIsCancelClicked} openModal={isCancelClicked} confirmCanceled={handleCancelOrder} />
      <RecievedOrder setOpenModal={setisOrderRecieved} openModal={isOrderRecieved} confirmRecieved={handleOrderRecieved} />
    </>
  );
}
