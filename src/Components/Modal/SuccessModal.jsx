
"use client";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import SuccessTick from "../SuccessTick";

export default function SuccessModal({openModal, setOpenModal,message,subMessage}) {

  return (
    <>
      <Modal show={openModal} className="bg-white/30 backdrop-blur-md sm:px-[5%] md:px-[20%] lg:px-[35%]" size="md" popup>
      
        {/* <Modal.Header /> */}
        <Modal.Body className="">
          <div className="text-center">
          <SuccessTick />
          <h1 className="text-xl font-bold ">{message}</h1>
          <h3 className="mb-5 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
             {subMessage}
            </h3>
            {/* <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div> */}
          </div>
        </Modal.Body>
   
      </Modal>
    </>
  );
}
