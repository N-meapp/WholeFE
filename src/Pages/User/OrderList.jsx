import { useEffect, useState } from "react";
import { listOrders } from "../../api/productApi";
import { useSelector } from "react-redux";
import { orders } from "../../constants/cards";
import EachOrder from "../../Components/Cards/EachOrder";

export default function OrderList() {
  const [order, setOrder] = useState();

  const user = useSelector((state) => state.user.user);



  useEffect(() => {
    // listOrders(setOrder, user.token);
  }, []);

  return (
    <>
      <div className="w-full md:pt-36 pt-28">
        <div className="w-[90%] mx-auto md:px-10 md:pt-10 pt-2 md:mt-14 mt-2 pb-20 md:bg-[#bebebe1c] h-auto rounded-xl grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3">
        {orders.map((order)=>{
          return(
            <EachOrder order={order} />
          )
        })}
          <div className="w-[100%] md:h-44 h-32 border border-[#72707034] mx-auto rounded-xl mb-2 md:mb-10 md:p-10 p-3 items-center flex gap-6"></div>
          
        </div>
      </div>
    </>
  );
}
