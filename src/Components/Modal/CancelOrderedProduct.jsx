import { faCircleInfo, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react";

export default function CancelOrderedProducts({openModal,setOpenModal,confirmCanceled}){
    return(
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
                      <FontAwesomeIcon icon={faCircleInfo} className="text-4xl" style={{color: "#FFD43B",}} />
                        <h1 className="text-xl font-bold ">Remove Item</h1>
                        <h3 className="mb-5 mt-3 md:mt-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to remove this item from your order?

                        </h3>
                        <div className="flex justify-end gap-4">
                          <Button
                            color="failure"
                            className="text-[#424242] bg-[white] shadow-lg"
                            onClick={() => {
                            setOpenModal(false)
                            }}
                          >
                            Keep Item
                          </Button>
                          <Button
                            color="failure"
                            className="text-[white] bg-black"
                            onClick={() => {
                              confirmCanceled();
                            }}
                          >
                           Remove Item
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
        </>
    )
}