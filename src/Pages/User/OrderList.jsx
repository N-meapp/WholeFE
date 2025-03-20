import { useEffect, useState } from "react";
import { listOrders } from "../../api/productApi";
import { useSelector } from "react-redux";
// import { orders } from "../../constants/cards";
import EachOrder from "../../Components/Cards/EachOrder";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import EmptyOrder from "../../Components/EmptyOrder";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  const [isOrderCanceled, setIsOrderCanceled] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    listOrders(setOrders, user.token).then(() => {
      setIsOrderCanceled(false);
    });
  }, [isOrderCanceled]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {orders.length < 0 ? (
        <div className="w-full md:pt-36 pt-28">
          <div className="w-[90%] mx-auto md:px-10 md:pt-10 pt-2 md:mt-14 mt-2 pb-20 md:bg-[#bebebe1c] h-auto rounded-xl grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3">
            {orders
              ?.slice()
              .reverse()
              .map((order) => {
                return (
                  <EachOrder
                    setIsOrderCanceled={setIsOrderCanceled}
                    order={order}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <EmptyOrder />
      )}
    </>
  );
}
