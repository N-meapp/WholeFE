
import { useEffect, useState } from 'react'
import { offerCards, productCards } from '../../constants/cards'
import ProductCards from '../../Components/Cards/ProductCards'
import ActiveInactiveTabs from '../../Components/Buttons/ActiveInactiveTabs'
import OfferCards from '../../Components/Cards/OfferCards'
import axios from 'axios'
import SeeMoreButton from '../../Components/Buttons/SeeMoreButton'
import { fetchNewlyArrivals } from '../../api/productApi'

export default function OffersTopRatedNewArrival(){

    const [newArraivals,setNewArraivals] = useState([])
    const [topProducts,setTopProducts] = useState([])
    const [selectedTab,setSelectedTab] = useState('Newly arrivals')




    useEffect(() => {
        
    
        fetchNewlyArrivals(setNewArraivals);
        // fetchData(setTopProducts);


    
        // Cleanup function (in case of unmounting)
        return () => {
          console.log("Component unmounted, cleanup if necessary");
        };
      }, []);

    const changeTab=(tab)=>{
        setSelectedTab(tab)
    }




    return(
        <>
            <div className="md:mt-24 mt-2 w-[90%] mx-auto h-auto md:mb-24 mb-8">
            <div className='w-full flex md:gap-10 gap-5 items-center'>
                {/* <h1 className="font-bold text-xl py-3 px-4 rounded-full bg-[#ff5a54] text-white cursor-pointer">Top offers</h1> */}
                {/* <ActiveInactiveTabs title={'Top offers'} isActive={selectedTab=='Top offers'?true:false} changeTab={changeTab} /> */}
                <ActiveInactiveTabs title={'Top products'} isActive={selectedTab=='Top products'?true:false} changeTab={changeTab} />
                <ActiveInactiveTabs title={'Newly arrivals'} isActive={selectedTab=='Newly arrivals'?true:false} changeTab={changeTab} />
            </div>
            <div className='w-full h-full md:mt-12 mt-8 md:pt-12 pt-4 md:pb-12 pb-4 md:bg-[#bebebe1c] rounded-xl text-center'>
                <div className="w-full h-full md:flex gap-3 md:gap-8 columns-2 md:flex-wrap justify-center">


                {selectedTab=='Newly arrivals'?
                    newArraivals.map((card)=>{
                    return(
                        <>
                        <ProductCards card={card} />
                        </>
                    )
                })
                :
                selectedTab=='Top products'?
                newArraivals.map((card)=>{
                    return(
                        <>
                        <ProductCards card={card} />
                        </>
                    )
                }):
                productCards.map((card)=>{
                    return(
                        <>
                        <ProductCards card={card} />
                        </>
                    )
                })
                }
                

             
                </div>
                <SeeMoreButton />
                </div>
            </div>
        </>
    )
}