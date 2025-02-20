
"use client";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmModal({openModal, setOpenModal}) {

  return (
    <>
      <Modal show={openModal} className="bg-white/30 backdrop-blur-md sm:px-[5%] md:px-[20%] lg:px-[35%]" onClick={()=>{setOpenModal(false)}} size="md" onClose={() => setOpenModal(false)} popup>
      
        <Modal.Header />
        <Modal.Body className="">
          <div className="text-center">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#ff3d77] text-4xl" />
          <h1 className="text-xl font-bold ">Login failed!</h1>
          <h3 className="mb-5 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
              Your email or password is incorrect.<br></br>
                Please try again.
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
