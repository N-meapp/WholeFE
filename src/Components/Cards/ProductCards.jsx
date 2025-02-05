import { useNavigate } from "react-router-dom";
import img from "../../assets/Images/products/shoeOne.png"



export default function ProductCards({ card }) {

  const navigate = useNavigate()

  const handleOnclick = ()=>{
    console.log('heelloooo');
    
    navigate('/product-details',{state:card})
  }

  return (
    <>
      <div onClick={()=>{
        handleOnclick()
      }} className="md:w-48 w-36 h-full  flex flex-col rounded-xl shadow-xl hover:shadow-none transition-all cursor-pointer">
        <img
          className=" md:h-48 h-32 object-cover object-center rounded-t-xl"
          src={card.images[0]}
        ></img>
        <div className="bg-[#ffffff] rounded-b-xl w-full text-center content-center h-32 p-2">
          <h1 className="font-bold text-lg text-[#535353]">{card.name}</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {card.minprice && card.maxprice ? (
              <h1 className="font-semibold">{`₹ ${card.minprice}-${card.maxprice}`}</h1>
            ) : (
              <h1 className="font-semibold">{`₹ ${
                card.minprice ? card.minprice : card.maxprice
              }`}</h1>
            )}
            {/* <h1 className='line-through text-gray-500 font-semibold'>₹ 3500</h1> */}
          </div>

          <h1 className="font-semibold text-green-400">{`Min. order: ${card.minOrder}`}</h1>
        </div>
      </div>
    </>
  );
}
