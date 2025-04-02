"use client";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function TechnicalError({ openModal, setOpenModal }) {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const confirmLogout = () => {
    dispatch({
      type: "SET_USER",
      payload: {
        user: null,
        token: null,
      profile:null
      },
    });

    navigate("/");
  };

  return (
    <>
      <Modal
        show={openModal}
        className="bg-white/30 backdrop-blur-md sm:px-[5%] md:px-[20%] lg:px-[35%] z-[500]"
        size="md"
        popup
      >
        <Modal.Body className="">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-[#ff3d77] text-4xl"
            />
            <h1 className="text-xl font-bold ">Technical Error !</h1>
            <h3 className="mb-5 mt-5 md:mt-10 text-sm font-normal text-gray-500 dark:text-gray-400">
              Something went wrong!
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                className="text-[white] bg-black"
                onClick={() => {
                  confirmLogout();
                }}
              >
                Login again
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
