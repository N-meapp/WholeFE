"use client";

import { faPaperPlane, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function SendEnquiryModal({ openModal, setOpenModal, handleSend }) {

    const [message,setMessage] = useState()

    const handleOnclick=()=>{
        // setOpenModal(false)
        
        // handleSend(message)

        const shareUrl = "https://n-meapp.github.io/BuyselImageGalleryTest/image-share.html?v=2";
        const message = "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, !";
        
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + " " + shareUrl)}`;
        window.open(whatsappUrl, "_blank");
    }

  return (
    <>
      <Modal
        show={openModal}
        className="bg-white/30 backdrop-blur-md sm:px-[5%] md:px-[20%] lg:px-[35%]"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body className="">
          <div className="">
            {/* <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#ff3d77] text-4xl" /> */}
            <div className="pb-4 border-b border-[#d8d7d7]">
              <h1 className="text-base font-bold mb-3">Selected Product</h1>
              <div className="w-32 p-1 shadow-lg bg-[#f3f3f3] rounded-full flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://www.finexxtravels.com/wp-content/uploads/2023/07/Vintage-Car-Rentals-in-Kerala-2.jpg"
                ></img>
                <h1 className="truncate">sfsdfsdfsed wsefwer we</h1>
              </div>
            </div>
            <h3 className="mb-3 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
              Write your message
            </h3>
            <textarea
            onChange={(e)=>{
                setMessage(e.target.value)
            }}
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type..."
              value={message}
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 mt-6">
              <Button className="font-bold shadow-md group hover:bg-[#ec7777] hover:border-[#ffffff]" color="gray" onClick={()=>{
                handleOnclick()
              }}>
              <FontAwesomeIcon className="text-lg group-hover:text-[white]" icon={faPaperPlane} />
              </Button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
