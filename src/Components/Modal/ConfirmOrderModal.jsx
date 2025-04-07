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
import { getCart, getSingleProduct } from "../../api/productApi";

export default function ConfirmOrderModal({
  openModal,
  setOpenModal,
  message,
  subMessage,
  confirmOrder,
  price,
  setIsAddressAdded,
  addressArray,
  isSingleProduct
}) {
  const [currentAddressSelected, setCurrentAddressSelected] = useState(-1);
  const [userData, setUserData] = useState();
  const user = useSelector((state) => state.user.user);
  const [isEmpty, setIsEmpty] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [address, setAddress] = useState();
  

  useEffect(() => {
    getUser(setUserData, user.token).then((res) => {
      setAddress(res?.address);
    });
  }, [openModal]);

  const handleOrder = async() => {
    let order = {};

    if(isSingleProduct){


      order = {
          address: getAddress(),
          order_id: getOrderId(),
          date: getDate(),
          final_amount: price,
          order_track:null,
          products: [{product_id:isSingleProduct.productId,count:isSingleProduct.count,total_amount:price,order_status:'null'}],  
      };
          
        
        
    }else{
      await getCart(setCartItems, user.token).then((res) => {
        if (res) {
          order = {
            userid: user.token,
            orders:{
              address: getAddress(),
              order_id: getOrderId(),
              date: getDate(),
              final_amount: price,
              order_track:null,
              products: getProducts(res),
            },
          };
          
        } else {
          setIsEmpty(true);
        }
  
      });
    }

    

    confirmOrder(order);
  };

const getAddress = () => {
    if (currentAddressSelected == -1) {
      return address;
    } else {
      return addressArray[currentAddressSelected];
    }
  };

  const getOrderId = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);

    const string1 = alphabet[Math.floor(Math.random() * alphabet.length)];

    const string2 = alphabet[Math.floor(Math.random() * alphabet.length)];

    const string3 = alphabet[Math.floor(Math.random() * alphabet.length)];

    const code = `${num1}${string1}${num2}${string2}${num3}${string3}`;

    return code;
  };

  const getDate = () => {
    const now = new Date();

    return now.toDateString();
  };

  const getProducts = (array) => {
    
    const tempArray = [];

    for (let i = 0; i < array.length; i++) {
      let obj = {};

      obj.product_id = array[i].product_id;
      obj.count = array[i].total_count;
      obj.total_amount = array[i].total_amount;
      obj.order_status = 'null';

      tempArray.push(obj);
    }

    return tempArray;
  };

  return (
    <>
      <Modal
        show={openModal}
        className="bg-white/30 backdrop-blur-md sm:px-[5%] z-[500] md:px-[20%] lg:px-[35%]"
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body className="">
          <div className="text-center">
            {/* <FontAwesomeIcon icon={faCircleExclamation}  className="text-[#FFD43B] text-4xl" /> */}

            <h1 className="text-xs font-bold text-start mb-3">
              select address
            </h1>

            <AddressRadioButton
              currentAddressSelected={currentAddressSelected}
              address={address}
              status={-1}
              setCurrentAddressSelected={setCurrentAddressSelected}
            />
            {addressArray?.map((address, i) => {
              return (
                <AddressRadioButton
                  currentAddressSelected={currentAddressSelected}
                  address={address}
                  status={i}
                  setCurrentAddressSelected={setCurrentAddressSelected}
                />
              );
            })}

            <button
              onClick={() => {
                setOpenModal(true);
                setIsAddressAdded(true);
              }}
              className="w-full bg-[#68a9ff] text-white py-2 rounded-xl text-base mb-10 select-none"
            >
              Add location manually
            </button>

            <h1 className="text-4xl font-bold mb-4 popins text-[#80c980]">
              {price} <span className="text-black">₹</span>
            </h1>
            <h1 className="text-xl font-bold ">{message}</h1>
            <h3 className="mb-5 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
              {subMessage}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="border-2 border-[#0000006b] text-[black] rounded-full"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </Button>
              <Button
                className="text-[white] bg-[black] border-none rounded-full items-center"
                onClick={() => {
                  handleOrder();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
