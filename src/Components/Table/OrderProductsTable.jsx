import {
  faBan,
  faCircleCheck,
  faCubesStacked,
  faMinus,
  faSpinner,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CancelOrderedProducts from "../Modal/CancelOrderedProduct";
import { cancelOrderProducts } from "../../api/productApi";
import { useSelector } from "react-redux";

export default function OrderProductsTable({
  product,
  addSelectedItem,
  orderId,
  // setIsOrderCanceled
}) {
  const user = useSelector((state) => state.user.user);
  const [status, setStatus] = useState(product.order_status);
  const [isAnyProductCancel, setIsAnyProductCancel] = useState(false);

  

  const confirmCanceled = async () => {
    await cancelOrderProducts(orderId, product.product_id, user.token).then(
      (result) => {
        if (result) {
          setIsAnyProductCancel(false);
          setStatus("Canceled");a
          // setIsOrderCanceled(true)

        } else {
          console.log("error");
        }
      }
    );
  };

  return (
    <>
      <div
        className={`w-full flex  ${
          status == "Reject" ? "bg-[#f5f5f5] text-[#6d6b6b]" : "text-[black]"
        } border-b-2 py-4 justify-evenly gap-3 items-center`}
      >
        <img
          className="w-20 h-20 object-cover rounded-lg "
          src={product?.product_images[0]}
        ></img>
        <h1 className={`text-sm font-bold w-1/4 break-words `}>
          {product?.product_name}
        </h1>
        <h1 className="text-sm w-fit break-words">4545.nos</h1>

        <h1
          className={`text-sm font-bold py-1 ${status=='Reject' ? "bg-[#f5f5f5] text-[#6d6b6b]" : "text-[black]"} px-2  h-fit rounded-full w-fit`}
        >
          {product?.total_amount} ₹
        </h1>
        <div
          className={`${
            status == "Reject" || status == "canceled"
              ? "border-[#fa9090] "
              : "border-[#f7f5f5]"
          } flex items-center gap-1 ${
          status=='Reject' ? "text-[#a3a2a2]" : "text-[#4e4d4d]"
        } md:text-base font-bold rounded-full text-sm py-2 px-3 bg-[#ffffff] w-fit border-2 `}
        >
          {status == "Accept" ? (
            <>
              <FontAwesomeIcon icon={faCircleCheck} />{" "}
              <h1 className="">Accepted</h1>
            </>
          ) : status == "Reject" ? (
            <>
              <FontAwesomeIcon icon={faBan} />
              <h1 className="">Rejected</h1>
            </>
          ) : status == "Canceled" ? (
            <>
              <FontAwesomeIcon icon={faBan} />
              <h1 className="">Canceled</h1>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSpinner} />
              <h1 className="">Pending</h1>
            </>
          )}
        </div>

        {status == "null" ? (
          <h1
            onClick={() => {
              setIsAnyProductCancel(true);
            }}
            className="text-sm font-bold py-2 px-3 border-2 cursor-pointer hover:border-[#f0efef] hover:bg-[#e97070] bg-white text-[#e97070] border-[#ffb4b4] shadow-lg h-fit hover:text-[#eeeeee] rounded-full w-fit"
          >
            Cancel item
          </h1>
        ) : null}
      </div>

      <CancelOrderedProducts
        openModal={isAnyProductCancel}
        setOpenModal={setIsAnyProductCancel}
        confirmCanceled={confirmCanceled}
      />
    </>
  );
}
