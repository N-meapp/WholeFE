import { useEffect, useState } from "react";

export default function OrderMap({status,orderId}) {
  const [orderStatus, setOrderStatus] = useState(status);
  useEffect(() => {

    const selectedOrder = document.getElementById(orderId)
    const orderStatusArray = selectedOrder.querySelectorAll(`.${orderStatus}`);

    for (let i = 0; i < orderStatusArray.length; i++) {
      orderStatusArray[i].classList.add("filling-box");
    }

    const orderMap = selectedOrder.querySelectorAll(".filling-box");
    console.log(selectedOrder,'selectedd ordder');
    

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

  return (
    <>



      <div className="mt-16 relative">
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

        <div className="items-center h-16 justify-center flex" id={orderId}>
          <div className="w-5 h-5 content-center items-center bg-[#e9e8e8] rounded-full Accept Packed Shipped Delivered"></div>
          <div className="w-1/4 h-[2px] bg-[#e9e8e8] Packed Shipped Delivered"></div>
          <div className="w-5 h-5 bg-[#e9e8e8] rounded-full Packed Shipped Delivered"></div>
          <div className="w-1/4 h-[2px] bg-[#e9e8e8] Shipped Delivered"></div>
          <div className="w-5 h-5 bg-[#e9e8e8] rounded-full Shipped Delivered"></div>
          <div className="w-1/4 h-[2px] bg-[#e9e8e8] Delivered"></div>
          <div className="w-5 h-5 bg-[#e9e8e8] rounded-full Delivered"></div>

          
        </div>
      </div>
    </>
  );
}

