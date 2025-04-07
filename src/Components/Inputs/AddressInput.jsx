import { Label } from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddressInput({ empty,label, value, objKey,setCurrAddress,currAddress,setEmpty}) {
  const [field, setField] = useState(value?value:'');
  const [isEmpty,setIsEmpty] = useState(false)


  useEffect(()=>{
    setIsEmpty(empty.includes(`${objKey}`))
    
  },[empty,objKey])

  const handleChange =(e)=>{
    let tempEmpty = empty

    if(e.target.value.trim() === ''){
      setIsEmpty(true)
      setField(e.target.value)
      tempEmpty.push(objKey)
      setEmpty(tempEmpty)

      
    }else{
      setField(e.target.value)
      setIsEmpty(false)
      const tempObj = currAddress
      tempObj[`${objKey}`] = e.target.value
      setCurrAddress(tempObj)
      tempEmpty = tempEmpty.filter(obj => obj !== objKey)
      setEmpty(tempEmpty)

    }
    
    
  }
  

  return (
    <>
      <div className="h-fit w-full relative">
        <label className="text-[10px] text-[#00000096] absolute bg-[white] -top-2 px-2 left-3">
          {label}
        </label>
        <input
          value={field}
          onChange={(e)=>{
            handleChange(e)
          }}
          className={`${isEmpty?'border-[#ff1c1c60]':'border-[#b3adad60]' } w-full h-10 rounded-lg px-3 border text-sm placeholder:text-sm`}
        ></input>
      </div>
    </>
  );
}
