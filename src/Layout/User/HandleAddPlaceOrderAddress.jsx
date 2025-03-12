import { useState } from "react";
import ConfirmOrderModal from "../../Components/Modal/ConfirmOrderModal";
import AddressForm from "./AddressForm";
import TemperoryAddress from "./TemporaryAddress";

export default function HandleAddPlaceOrderAddress({
  openModal,
  setOpenModal,
  message,
  subMessage,
  confirmOrder,
  price,
}) {

  console.log(openModal,'opennnnnnnnn - modalllll');
  

  const [addressArray,setAddressArray] = useState([])

    const [isAddressAdded,setIsAddressAdded] = useState(false)

    const [currAddress, setCurrAddress] = useState({
      postcode: null,
      state: null,
      district: null,
      city: null,
      housename: null,
      roadname: null,
    });

    const handleSaveAddress =(arr)=>{
      setAddressArray(arr)
    }


  return (
    <>
    {isAddressAdded?
   <TemperoryAddress setIsAddressAdded={setIsAddressAdded} isAddressAdded={isAddressAdded} setCurrAddress={setCurrAddress} currAddress={currAddress} handleSaveAddress={handleSaveAddress} addressArray={addressArray} />
    :
      <ConfirmOrderModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        message={message}
        subMessage={subMessage}
        confirmOrder={confirmOrder}
        price={price}
        setIsAddressAdded={setIsAddressAdded}
        addressArray={addressArray}
      />
    }
    </>
  );
}
