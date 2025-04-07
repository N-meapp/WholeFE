import axios from "axios";
import { useEffect, useState } from "react";
import ProductCards from "../../Components/Cards/ProductCards";
import SlidingProductsCard from "../../Components/Cards/SlidingProductsCard";
import { Meta, useNavigate } from "react-router-dom";
import {
  fetchAllProducts,
  fetchLimitedProducts,
  fetchNewlyArrivals,
} from "../../api/productApi";

export default function ProductsHorizontalSlider() {
  const [data, setData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetchLimitedProducts(setData);
    // Cleanup function (in case of unmounting)
    return () => {
      console.log("Component unmounted, cleanup if necessary");
    };
  }, []);

  const handleNav = ()=>{
    navigate('/list')
  }

  return (
    <>
      <div className=" overflow-x-auto whitespace-nowrap scrollbar-hide py-3 md:hidden block ">
        <div className="w-fit h-auto flex gap-3 px-[5%] pb-5">
          {data?.map((card) => {
            return <SlidingProductsCard card={card} />;
          })}
          <div
            onClick={() => {
              handleNav()
            }}
            className="w-36 borde border-[#e2e2e2] text-xs shadow-lg text-[#252525] bg-white font-bold rounded-lg content-center text-center"
          >
            <h1>Explore More</h1>
          </div>
        </div>
      </div>
    </>
  );
}
