import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToHistory } from "../../api/productApi";

export default function OfferCards({ card }) {

  const user = useSelector((state) => state.user.user);


  const navigate = useNavigate()

  const handleOnclick = ()=>{
    console.log('heelloooo');
    addToHistory(user.token,card?.product_category)
    navigate('/product-details',{state:card})
  }
    


    return (
      <>
        <div onClick={()=>{
          handleOnclick()
        }} className="md:w-48 w-36 h-full  flex flex-col rounded-xl shadow-xl hover:shadow-none transition-all cursor-pointer">
          <img
            className="md:h-48 h-32 object-cover  object-center rounded-t-xl"
            src={card.images[0]}
          ></img>
          <div className="bg-[#ffffff] rounded-b-xl w-full text-center p-2 content-center h-32">
            <h1 className="font-bold text-lg text-[#535353]">{card.name}</h1>
            <div className="flex flex-wrap gap-4 justify-center">
            <h1 className=' font-semibold'>₹ {card.offerprice}</h1>

              <h1 className='line-through text-gray-500 font-semibold'>₹ {card.originalprice}</h1>
            </div>
  
            <h1 className="font-semibold text-green-400">{`Min. order: ${card.minOrder}`}</h1>
          </div>
        </div>
      </>
    );
  }