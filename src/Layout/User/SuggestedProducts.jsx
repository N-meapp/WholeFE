import { useState } from "react";
import { offerCards, productCards } from "../../constants/cards";
import ProductCards from "../../Components/Cards/ProductCards";
import ActiveInactiveTabs from "../../Components/Buttons/ActiveInactiveTabs";
import OfferCards from "../../Components/Cards/OfferCards";

export default function SuggestedProducts() {
  const [selectedTab, setSelectedTab] = useState("Suggested products");

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="mt-14 w-[90%] mx-auto h-auto mb-24">
        <div className="w-full flex gap-10 items-center">
          {/* <h1 className="font-bold text-xl py-3 px-4 rounded-full bg-[#ff5a54] text-white cursor-pointer">Top offers</h1> */}
          <ActiveInactiveTabs
            title={"Suggested products"}
            isActive={selectedTab == "Suggested products" ? true : false}
            changeTab={changeTab}
          />
          {/* <ActiveInactiveTabs title={'Top products'} isActive={selectedTab=='Top products'?true:false} changeTab={changeTab} />
                <ActiveInactiveTabs title={'Newly arrivals'} isActive={selectedTab=='Newly arrivals'?true:false} changeTab={changeTab} /> */}
        </div>
        <div className="w-full h-full mt-12 pt-12 pb-12 bg-[#bebebe1c] rounded-xl text-center">
          <div className="w-full h-full flex gap-8 flex-wrap justify-center ">
            {selectedTab == "Suggested products"
              ? productCards.map((card) => {
                  return (
                    <>
                      <ProductCards card={card} />
                    </>
                  );
                })
              : selectedTab == "Top offers"
              ? offerCards.map((card) => {
                  return (
                    <>
                      <OfferCards card={card} />
                    </>
                  );
                })
              : productCards.map((card) => {
                  return (
                    <>
                      <ProductCards card={card} />
                    </>
                  );
                })}
          </div>
          <button className="py-3 px-5 mt-20 bg-[#ff5a54] rounded-full text-[#ffffff] text-base font-bold">
            See more
          </button>
        </div>
      </div>
    </>
  );
}
