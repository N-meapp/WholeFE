import {
    faBan,
  faCircleCheck,
  faCubesStacked,
  faSpinner,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderStatusButton({ orderStatus }) {
  return (
    <>
      <div className={`${orderStatus=='Reject'?'border-[#fa9090]':'border-[#f7f5f5]'} flex items-center gap-1 text-sm md:text-base text-[#4e4d4d] font-bold py-3 px-2 bg-[#ffffff] shadow-lg w-fit rounded-lg border-2 mt-5`}>
        {orderStatus == "Delivered" ? (
          <>
            <FontAwesomeIcon icon={faTruck} />
            <h1 className="">Delivered</h1>
          </>
        ) : orderStatus == "Accept" ? (
          <>
            <FontAwesomeIcon icon={faCircleCheck} />{" "}
            <h1 className="">Accepted</h1>
          </>
        ) : orderStatus == "Shipped" ? (
          <>
            <FontAwesomeIcon icon={faTruckFast} />
            <h1 className="">Shipped</h1>
          </>
        ) : orderStatus == "Reject" ? (
          <>
            <FontAwesomeIcon icon={faBan} />
            <h1 className="">Rejected</h1>
          </>
        ) : orderStatus == "Packed" ? (
          <>
            <FontAwesomeIcon icon={faCubesStacked} />
            <h1 className="">Packed</h1>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faSpinner} />
            <h1 className="">Pending</h1>
          </>
        )}
      </div>
    </>
  );
}
