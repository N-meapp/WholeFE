import {
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";

export default function RecievedOrder({
  openModal,
  setOpenModal,
  confirmRecieved,
}) {
  return (
    <>
      <Modal
        show={openModal}
        className="bg-white/30 backdrop-blur-md sm:px-[5%] md:px-[20%] lg:px-[35%] z-[500]"
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />

        <Modal.Body className="">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-6xl mb-5"
              style={{ color: "#74C0FC" }}
            />
            <h1 className="text-xl font-bold ">Delivery Confirmation</h1>
            <h3 className="mb-5 mt-3 md:mt-5 text-sm font-normal text-gray-500 dark:text-gray-400">
              Did you receive your order?
            </h3>
            <div className="flex justify-end gap-4">
              <div
                color="failure"
                className="text-[#424242] bg-[white] shadow-lg text-sm py-3 rounded-md px-4 content-center cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "#ff1a7d" }}
                />
                {"  "}
                No, I haven’t
              </div>
              <div
                color="failure"
                className="text-[white] bg-black text-sm rounded-md px-4 content-center cursor-pointer"
                onClick={() => {
                  confirmRecieved();
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: "#63E6BE" }}
                />
                {"  "}
                Yes, I received it
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
