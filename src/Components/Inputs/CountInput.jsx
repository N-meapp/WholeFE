import { useSelector } from "react-redux";
import {updateProductCount } from "../../api/productApi";

export default function CountInput({count,setCount,stock,productId ,countPriceArray, setCountPriceArray,priceRange,handleSetArray}){

  const user = useSelector((state) => state.user.user);


    const handleCount = (action) => {

      let tempCount = count
        if (action == "minus") {
          if (count != 0) {

            tempCount = count - 1
            setCount((count) => {
              return --count ;
            });
          }
        } else {
          tempCount = count + 1
          setCount((count) => {
            return ++count;
          });
        }

        handleProductCount(tempCount)
        updateProductCount(tempCount,productId,user.token)

      };
    
      function isNumericString(str) {
        // The ^\d+$ regex matches strings that contain only digits (0-9) from start to end.
        if (str) {
          return /^\d+$/.test(str);
        }
      }
    
      const handleOnchange = (value) => {
        const status = isNumericString(value);
    
        if (status) {
          setCount(value);
          handleProductCount(value)
          updateProductCount(value,productId,user.token)
        } 
      };


      const handleProductCount = (countParam) =>{

        const tempArray = countPriceArray

        for (let i = 0; i < countPriceArray?.length; i++) {
          

          if(countPriceArray[i].id==productId){
           
            tempArray[i].count = countParam
            tempArray[i].price = findPrice(countParam)
            
          }
          
        }

        // setCountPriceArray(tempArray)
        handleSetArray(tempArray)

      }


      const findPrice = (countParam) =>{
        
        let tempPrice = 0
        for (let j = 0; j < priceRange.length; j++) {
    
          if(priceRange[j].from<=countParam && countParam <=priceRange[j].to){
    
            tempPrice = priceRange[j].prize;
        
          }
    
          
        }
        return tempPrice
    
      }


    return (
        <>

<div className="flex justify-center gap-2 mb-3">
          <div
            onClick={() => {
              handleCount("minus");
            }}
            className="md:w-14 md:h-14 w-10 h-10 bg-[#ffffff] shadow-md rounded-full content-center justify-items-center cursor-pointer hover:shadow-none select-none md:hover:w-[3.2rem] md:hover:h-[3.2rem] hover:bg-[#ffffff] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="md:size-8 size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            onChange={(e) => {
              handleOnchange(e.target.value);
            }}
            className="rounded-full w-36 bg-[#ffffff00] text-black font-semibold px-5 text-center border-[#1b1b1b6c] border-[1px]"
            value={count}
          ></input>
          <div
            onClick={() => {
              handleCount("plus");
            }}
            className="md:w-14 md:h-14 w-10 h-10 bg-[#ffffff] shadow-md rounded-full content-center justify-items-center cursor-pointer hover:shadow-none md:hover:w-[3.2rem] md:hover:h-[3.2rem] select-none hover:bg-[#ffffff] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="md:size-8 size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        </>
    )
}