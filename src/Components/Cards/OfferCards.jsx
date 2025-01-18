import { useNavigate } from "react-router-dom";

export default function OfferCards({ card }) {

   

  const navigate = useNavigate()

  const handleOnclick = ()=>{
    console.log('heelloooo');
    
    navigate('/product-details',{state:card})
  }
    


    return (
      <>
        <div onClick={()=>{
          handleOnclick()
        }} className="w-48 h-full  flex flex-col rounded-xl shadow-xl hover:shadow-none transition-all cursor-pointer">
          <img
            className="h-48 object-cover  object-center rounded-t-xl"
            src={card.images[0]}
          ></img>
          <div className="bg-[#ffffff] rounded-b-xl w-full text-center p-2 content-center h-32">
            <h1 className="font-bold text-lg text-[#535353]">{card.name}</h1>
            <div className="flex flex-wrap gap-4 justify-center">
            <h1 className=' font-semibold'>₹ {card.offerPrize}</h1>

              <h1 className='line-through text-gray-500 font-semibold'>₹ {card.originalPrize}</h1>
            </div>
  
            <h1 className="font-semibold text-green-400">{`Min. order: ${card.minOrder}`}</h1>
          </div>
        </div>
      </>
    );
  }