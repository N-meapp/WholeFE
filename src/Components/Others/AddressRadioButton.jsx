import { select } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function AddressRadioButton({
  currentAddressSelected,
  setCurrentAddressSelected,
  address,
  status
}) {

    


    const [isButtonSelected,setIsButtonSelected] = useState(false)

   const selectAddress = ()=>{
    
        setCurrentAddressSelected(status)
    }


    useEffect(()=>{
            if(currentAddressSelected==status){
                setIsButtonSelected(true)
            }else{
               setIsButtonSelected(false)
            }
    },[currentAddressSelected])

  return (
    <>  
      <div
        onClick={() => {
          selectAddress();
        }}
        className="bg-[#fafafa] rounded-xl mx-auto mb-5 py-3 px-2 shadow-md flex gap-2 cursor-pointer "
      >
        <div>
          {isButtonSelected ? (
            <div className="w-4 h-4 rounded-full border border-[#0000008a] cursor-pointer ml-[2px] select-none content-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#000000] mx-auto"></div>
            </div>
          ) : (
            <div
              onClick={() => {
                selectAddress();
              }}
              className="w-4 h-4 rounded-full border border-[#0000008a] cursor-pointer ml-[2px] select-none"
            ></div>
          )}
        </div>
        <div className="text-xs md:text-sm break-words overflow-hidden text-start">
          <h1 className="break-words">
            {`${address?.postcode ?? ""} ${address?.state ?? ""} ${
              address?.district ?? ""
            } ${address?.city ?? ""} ${address?.housename ?? ""} ${
              address?.roadname ?? ""
            }`.trim()}
          </h1>
        </div>
      </div>
    </>
  );
}
