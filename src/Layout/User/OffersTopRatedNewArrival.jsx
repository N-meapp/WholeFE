
import { useState } from 'react'
import { offerCards, productCards } from '../../constants/cards'
import ProductCards from '../../Components/Cards/ProductCards'
import ActiveInactiveTabs from '../../Components/Buttons/ActiveInactiveTabs'
import OfferCards from '../../Components/Cards/OfferCards'

export default function OffersTopRatedNewArrival(){

    const [selectedTab,setSelectedTab] = useState('Top offers')

    const changeTab=(tab)=>{
        setSelectedTab(tab)
    }

    return(
        <>
            <div className="md:mt-24 mt-10 w-[90%] mx-auto h-auto md:mb-24 mb-8">
            <div className='w-full flex md:gap-10 gap-5 items-center'>
                {/* <h1 className="font-bold text-xl py-3 px-4 rounded-full bg-[#ff5a54] text-white cursor-pointer">Top offers</h1> */}
                {/* <ActiveInactiveTabs title={'Top offers'} isActive={selectedTab=='Top offers'?true:false} changeTab={changeTab} /> */}
                <ActiveInactiveTabs title={'Top products'} isActive={selectedTab=='Top products'?true:false} changeTab={changeTab} />
                <ActiveInactiveTabs title={'Newly arrivals'} isActive={selectedTab=='Newly arrivals'?true:false} changeTab={changeTab} />
                
            </div>
            <div className='w-full h-full md:mt-12 mt-8 md:pt-12 pt-4 md:pb-12 pb-4 bg-[#bebebe1c] rounded-xl text-center'>
                <div className="w-full h-full flex gap-8 flex-wrap justify-center">


                {selectedTab=='Top products'?
                    productCards.map((card)=>{
                    return(
                        <>
                        <ProductCards card={card} />
                        </>
                    )
                })
                :
                selectedTab=='Top offers'?
                offerCards.map((card)=>{
                    return(
                        <>
                        <OfferCards card={card} />
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
                <button className='py-3 px-5 md:mt-20 mt-8 bg-[#ff5a54] rounded-full text-[#ffffff] text-sm md:text-base font-bold'>See more</button>
                </div>
            </div>
        </>
    )
}