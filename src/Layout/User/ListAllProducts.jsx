import { useEffect, useState } from "react";
import { offerCards, productCards } from "../../constants/cards";
import ProductCards from "../../Components/Cards/ProductCards";
import ActiveInactiveTabs from "../../Components/Buttons/ActiveInactiveTabs";
import OfferCards from "../../Components/Cards/OfferCards";
import SeeMoreButton from "../../Components/Buttons/SeeMoreButton";
import { fetchAllProducts, fetchNewlyArrivals } from "../../api/productApi";

export default function ListAllProducts(){

    const [allProducts,setAllProducts] = useState([])




    useEffect(() => {
        
    
        fetchAllProducts(setAllProducts);
    
        return () => {
          console.log("Component unmounted, cleanup if necessary");
        };
      }, []);


    return(
        <>
            <div className="md:mt-24 mt-2 w-[90%] mx-auto h-auto md:mb-24 mb-8">
            <div className='w-full flex md:gap-10 gap-5 items-center'>
            </div>
            <div className='w-full h-full md:mt-12 mt-8 md:pt-12 pt-4 md:pb-12 pb-4 md:bg-[#bebebe1c] rounded-xl text-center'>
                <div className="w-full h-full md:flex gap-3 md:gap-8 columns-2 md:flex-wrap justify-center">


                {
                    allProducts.map((card)=>{
                    return(
                        <>
                        <ProductCards card={card} />
                        </>
                    )
                })
                }
                

             
                </div>
                </div>
            </div>
        </>
    )
}
