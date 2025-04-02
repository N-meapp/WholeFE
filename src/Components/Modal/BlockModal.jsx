"use client";

import { faBan, faLock, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function BlockModal() {




  return (
    <>
      <Modal
        show={true}
        className="bg-white/30 backdrop-blur-md sm:px-[5%] md:px-[20%] lg:px-[35%] z-[500]"
        size="md"
        popup
      >
        <Modal.Body className="">
          <div className="text-center">
            {/* <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-[#ff3d77] text-4xl"
            /> */}

<FontAwesomeIcon icon={faBan} className="text-[#ff3d77] text-4xl" />
            <h1 className="text-xl font-bold mt-3">OOPS !</h1>
            <h3 className="mb-5 mt-2 md:mt-5 text-sm font-normal text-gray-500 dark:text-gray-400">
              You were blocked by admin.
            </h3>
            <div className="flex justify-center gap-4">
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
