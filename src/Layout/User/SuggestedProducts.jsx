import { useEffect, useState } from "react";
import { offerCards, productCards } from "../../constants/cards";
import ProductCards from "../../Components/Cards/ProductCards";
import ActiveInactiveTabs from "../../Components/Buttons/ActiveInactiveTabs";
import OfferCards from "../../Components/Cards/OfferCards";
import SeeMoreButton from "../../Components/Buttons/SeeMoreButton";
import {
  fetchNewlyArrivals,
  fetchSuggestedProducts,
} from "../../api/productApi";
import { useSelector } from "react-redux";

export default function SuggestedProducts() {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("suggested-products");
  const user = useSelector((state) => state.user.user);


  useEffect(() => {
    fetchSuggestedProducts(setSuggestedProducts,user.token).then((res)=>{
      if(!res){
        setSuggestedProducts([])
      }
    })
    return () => {
      console.log("Component unmounted, cleanup if necessary");
    };
  }, []);

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="md:mt-24 mt-2 w-[90%] mx-auto h-auto md:mb-24 mb-8">

        <div className="w-full flex md:gap-10 gap-5 items-center">
          {/* <h1 className="font-bold text-xl py-3 px-4 rounded-full bg-[#ff5a54] text-white cursor-pointer">Top offers</h1> */}
          {/* <ActiveInactiveTabs title={'Top offers'} isActive={selectedTab=='Top offers'?true:false} changeTab={changeTab} /> */}
          <ActiveInactiveTabs
            title={"Suggested Products"}
            isActive={selectedTab == "suggested-products" ? true : false}
            changeTab={changeTab}
          />
        </div>
        <div className="w-full h-full md:mt-12 mt-8 md:pt-12 pt-4 md:pb-12 pb-4 md:bg-[#bebebe1c] rounded-xl text-center">
          {/* <div className="w-full h-full md:flex gap-3 md:gap-8 columns-2 md:flex-wrap justify-center">
           {suggestedProducts?.map((card) => {
                  return (
                    <>
                      <ProductCards card={card} />
                    </>
                  );
                })
              }
          </div> */}
          <div className="w-full h-full md:flex gap-3 md:gap-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:flex-wrap justify-center">
            {suggestedProducts?.map((card) => (
              <ProductCards key={card.id} card={card} />
            ))}
          </div>

          <SeeMoreButton />
        </div>
      </div>
    </>
  );
}
