"use client";

import {
  faCircleCheck,
  faPaperPlane,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import WhatsappEnquiry from "../Buttons/WhatsappEnquiry";

export default function SendEnquiryModal({
  openModal,
  setOpenModal,
  handleSend,
  card,
}) {
  console.log(card, "product productsss");

  const [isEnquirySend, setIsEnquirySend] = useState(false);

  const [isWhatsapp, setIsWhatsapp] = useState(true)

  const [message, setMessage] = useState();

  const navigate = useNavigate()

  const handleOnclick = () => {
    // setOpenModal(false)

    handleSend(message, isWhatsapp);

    setIsEnquirySend(true);

    setTimeout(() => {
      navigate('/')
    }, 500
    );

  };

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
                  src={card.product_images[0]}
                ></img>
                <h1 className="truncate">{card.product_name}</h1>
              </div>
            </div>
            <h3 className="mb-3 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
              Write your message
            </h3>
            <textarea
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type..."
              value={message}
            ></textarea>
          </div>
          <div className="flex justify-between md:gap-14 gap-8 mt-6 items-center">
            <WhatsappEnquiry isWhatsapp={isWhatsapp} setIsWhatsapp={setIsWhatsapp} />
            {!isEnquirySend ? (
              <Button
                className="font-bold shadow-md group hover:bg-[#ec7777] hover:border-[#ffffff]"
                color="gray"
                onClick={() => {
                  handleOnclick();
                }}
              >
                <FontAwesomeIcon
                  className="text-lg group-hover:text-[white]"
                  icon={faPaperPlane}
                />
              </Button>
            ) : (
              <>
                <Button
                  className="font-bold shadow-md"
                  color="gray"
                >
                  <FontAwesomeIcon
                    className="text-lg text-[#1e6e86]"
                    icon={faCircleCheck} />
                </Button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
