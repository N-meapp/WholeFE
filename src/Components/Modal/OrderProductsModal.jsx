"use client";

import {
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import AddressForm from "../../Layout/User/AddressForm";
import { getUser } from "../../api/userApi";
import { useSelector } from "react-redux";
import AddressRadioButton from "../Others/AddressRadioButton";
import { getCart } from "../../api/productApi";
import OrderProductsTable from "../Table/OrderProductsTable";

export default function OrderProductsModal({products,orderId, openModal, setOpenModal,setIsOrderCanceled }) {

  const [selectClicked,setIselectClicked] = useState()
  const [selectedItems,setSelectedItems] = useState([])

  const addSelectedItem = (item,status)=>{


    if(!status){
      let tempArray = selectedItems
    
      tempArray.push(item)
      
      setSelectedItems(tempArray)
    }else{

      let newArr = selectedItems.filter(value =>  value !== item); 

      setSelectedItems(newArr)

    }
      
    
  }

  const cancelSelectedProducts =()=>{
    console.log(selectedItems,'seleletere');
    
  }

  
  
  return (
    <>
      <Modal
        show={openModal}
        className="bg-white/30 backdrop-blur-md sm:px-[5%] z-[500] md:px-[5%] lg:px-[15%] w-full max-w-none"
        // size="md"
        onClose={() => {
          setIsOrderCanceled(true)
          setOpenModal(false)
          }}
        popup
      >
        <Modal.Header />
        <Modal.Body>

    {products?.map((product)=>{
      return(
        <>
          <OrderProductsTable product={product} orderId={orderId} addSelectedItem={addSelectedItem} />
        </>
      )
    })}


            <button className=""></button>

        </Modal.Body>
      </Modal>
    </>
  );
}
