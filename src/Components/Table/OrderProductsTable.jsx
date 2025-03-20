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

  console.log(product,'each product aree....');
  

  const confirmCanceled = async () => {
    await cancelOrderProducts(orderId, product.product_id, user.token).then(
      (result) => {
        if (result) {
          setIsAnyProductCancel(false);
          setStatus("canceled");
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
          status == "rejected" ? "bg-[#f5f5f5] text-[#6d6b6b]" : "text-[black]"
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
          className={`text-sm font-bold py-1 ${status=='rejected' ? "bg-[#f5f5f5] text-[#6d6b6b]" : "text-[black]"} px-2  h-fit rounded-full w-fit`}
        >
          {product?.total_amount} ₹
        </h1>
        <div
          className={`${
            status == "rejected" || status == "canceled"
              ? "border-[#fa9090] "
              : "border-[#f7f5f5]"
          } flex items-center gap-1 ${
          status=='rejected' ? "text-[#a3a2a2]" : "text-[#4e4d4d]"
        } md:text-base font-bold rounded-full text-sm py-2 px-3 bg-[#ffffff] w-fit border-2 `}
        >
          {status == "accepted" ? (
            <>
              <FontAwesomeIcon icon={faCircleCheck} />{" "}
              <h1 className="">Accepted</h1>
            </>
          ) : status == "rejected" ? (
            <>
              <FontAwesomeIcon icon={faBan} />
              <h1 className="">Rejected</h1>
            </>
          ) : status == "canceled" ? (
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

// const [isTabSelected, setIsTabSelected] = useState(() => {
//   if (
//     product.order_status == "canceled" ||
//     product.order_status == "rejected"
//   ) {
//     return true;
//   } else {
//   }
//   return false;
// });

// const user = useSelector((state) => state.user.user);

// const [isAnyProductCancel, setIsAnyProductCancel] = useState(false);

// const [status, setStatus] = useState(product.order_status);

// const confirmCanceled = async () => {
//   await cancelOrderProducts(orderId, product.product_id, user.token).then(
//     (result) => {
//       if (result) {
//         setIsTabSelected(true);
//         setIsAnyProductCancel(false);
//         setStatus("canceled");
//       } else {
//         console.log("error");
//       }
//     }
//   );
// };

// return (
//   <>
//     {/* <div className="w-full flex border-b-2 py-8 justify-evenly gap-3 items-center">
//       <h1
//         className="w-20 h-20 object-cover rounded-lg"
//       >Image</h1>
//       <h1 className="text-sm font-bold w-1/4 break-words">
//       Name
//       </h1>

//       <h1 className="text-sm w-1/4 break-words truncate">
//           Description
//       </h1>
//       <h1 className="text-sm w-fit break-words">
//         Count
//       </h1>

//       <h1 className="text-sm font-bold py-1 px-2 bg-[#7aa07a] h-fit text-white rounded-full w-fit">Amount</h1>
//       <h1 className="text-sm font-bold py-2 px-3 border-2 border-[#f0efef] bg-[#ffffff] shadow-lg h-fit text-[#333333] rounded-full w-fit">status</h1>
//     </div> */}

//     <div
//       className={`w-full flex ${
//         isTabSelected ? "bg-[#f5f5f5] text-[#6d6b6b]" : "text-[black]"
//       } border-b-2 py-4 justify-evenly gap-3 items-center`}
//     >
//       <img
//         className="w-20 h-20 object-cover rounded-lg "
//         src={product?.product_images[0]}
//       ></img>
//       <h1 className={`text-sm font-bold w-1/4 break-words `}>
//         {product?.product_name}
//       </h1>
//       <h1 className="text-sm w-fit break-words">4545.nos</h1>

//       <h1
//         className={`text-sm font-bold py-1 px-2 ${
//           isTabSelected ? "bg-[#949b94]" : "bg-[#7aa07a]"
//         }  h-fit text-white rounded-full w-fit`}
//       >
//         {product?.total_amount} ₹
//       </h1>
//       {/* <h1 className="text-sm font-bold py-2 px-3 border-2 border-[#f0efef] bg-[#ffffff] h-fit text-[#333333] rounded-full w-fit">{handleStatus()}</h1> */}
//       <div
//         className={`${
//           status == "rejected" || status == "canceled"
//             : "border-[#f7f5f5]"
//         } flex items-center gap-1 md:text-base ${
//           isTabSelected ? "text-[#a3a2a2]" : "text-[#4e4d4d]"
//         }  font-bold rounded-full text-sm py-2 px-3 bg-[#ffffff] w-fit border-2 `}
//       >
//         {status == "accepted" ? (
//           <>
//             <FontAwesomeIcon icon={faCircleCheck} />{" "}
//             <h1 className="">Accepted</h1>
//           </>
//         ) : status == "rejected" ? (
//           <>
//             <FontAwesomeIcon icon={faBan} />
//             <h1 className="">Rejected</h1>
//           </>
//         ) : status == "canceled" ? (
//           <>
//             <FontAwesomeIcon icon={faBan} />
//             <h1 className="">Canceled</h1>
//           </>
//         ) : (
//           <>
//             <FontAwesomeIcon icon={faSpinner} />
//             <h1 className="">Pending</h1>
//           </>
//         )}
//       </div>

//       {isTabSelected ? (
//         <>
//           <h1 className="text-sm font-bold w-24 h-fit">
//             {/* <FontAwesomeIcon icon={faBan} style={{ color: "#ffffff" }} />{" "}
//           Canceled */}
//           </h1>
//         </>
//       ) : status == "null" ? (
//         <h1
//           onClick={() => {
//             setIsAnyProductCancel(true);
//           }}
//           className="text-sm font-bold py-2 px-3 border-2 cursor-pointer hover:border-[#f0efef] hover:bg-[#e97070] bg-white text-[#e97070] border-[#ffb4b4] shadow-lg h-fit hover:text-[#eeeeee] rounded-full w-fit"
//         >
//           Cancel item
//         </h1>
//       ) : null}
//     </div>

//     <CancelOrderedProducts
//       openModal={isAnyProductCancel}
//       setOpenModal={setIsAnyProductCancel}
//       confirmCanceled={confirmCanceled}
//     />
//   </>
// );
