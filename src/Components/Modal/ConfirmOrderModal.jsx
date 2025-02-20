
"use client";

import { faCircleExclamation, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmOrderModal({openModal, setOpenModal,message,subMessage,confirmOrder}) {

  return (
    <>
      <Modal show={openModal} className="bg-white/30 backdrop-blur-md sm:px-[5%] z-[500] md:px-[20%] lg:px-[35%]" onClick={()=>{setOpenModal(false)}} size="md" onClose={() => setOpenModal(false)} popup>
      
        <Modal.Header />
        <Modal.Body className="">
          <div className="text-center">
          {/* <FontAwesomeIcon icon={faCircleExclamation}  className="text-[#FFD43B] text-4xl" /> */}
          <h1 className="text-4xl font-bold mb-4 popins text-[#80c980]">6667 <span className="text-black">₹</span></h1>
          <h1 className="text-xl font-bold ">{message}</h1>
          <h3 className="mb-5 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
              {subMessage}
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="border-2 border-[#0000006b] text-[black] rounded-full" onClick={() => setOpenModal(false)} >
              No, cancel
              </Button>
              <Button className="text-[white] bg-[black] border-none rounded-full items-center" onClick={() =>{
                 setOpenModal(false)
                 confirmOrder()
              }}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal.Body>
   
      </Modal>
    </>
  );
}
