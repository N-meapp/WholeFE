import { Modal } from "flowbite-react";
import { useState } from "react";
import AddressForm from "./AddressForm";
import AddressInput from "../../Components/Inputs/AddressInput";

export default function TemporaryAddress({
  isAddressAdded,
  setIsAddressAdded,
  currAddress,
  setCurrAddress,
  handleSaveAddress,
  addressArray
}) {
  const [empty, setEmpty] = useState([]);

  const handleSave = () => {
    // setEmpty([
    //   "postcode",
    //   "state",
    //   "district",
    //   "city",
    //   "housename",
    //   "roadname",
    //   "landmark"
    // ])
    console.log(empty, "emppppptyyy");
    let tempArr = [];
    if (empty.length == 0) {
      console.log(currAddress, "curreaddress");
      // handleSaveAddress(currAddress);
      tempArr = [...addressArray,currAddress]
      // setAddressArray(tempArr)
      handleSaveAddress(tempArr)
      setIsAddressAdded(false);
    }
  };

  return (
    <>
      <Modal
        show={isAddressAdded}
        className="bg-white/30 backdrop-blur-md sm:px-[2%] z-[500] md:px-10%] lg:px-[20%]"
        size="md"
        onClose={() => {
          setIsAddressAdded(false);
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body className="">
          <div className="flex w-full mb-6 gap-2">
            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              currAddress={currAddress}
              label={"Pincode"}
              value={currAddress?.postcode}
              objKey={"postcode"}
            />

            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              currAddress={currAddress}
              label={"State"}
              value={currAddress?.state}
              objKey={"state"}
            />
          </div>
          <div className="flex flex-col w-full gap-6 mb-4">
            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              currAddress={currAddress}
              label={"District"}
              value={currAddress?.district}
              objKey={"district"}
            />

            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              currAddress={currAddress}
              label={"City"}
              value={currAddress?.city}
              objKey="city"
            />
            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              currAddress={currAddress}
              label={"House Name"}
              value={currAddress?.housename}
              objKey="housename"
            />
            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              currAddress={currAddress}
              label={"Road name, Area, Colony"}
              value={currAddress?.roadname}
              objKey="roadname"
            />
            <AddressInput
              setEmpty={setEmpty}
              empty={empty}
              setCurrAddress={setCurrAddress}
              value={currAddress?.landmark}
              objKey="landmark"
              currAddress={currAddress}
              label={"Add landmark"}
            />
          </div>

          <div className="flex justify-between">
            <div className="">
              {empty.length !== 0 ? (
                <span className="text-[12px] text-[#ee6a6a] font-semibold">
                  <span className="text-sm">*</span> Fill the indicated fields
                </span>
              ) : null}
            </div>
            <div className="flex gap-4 justify-between">
              <button
                onClick={() => {
                  setIsAddressAdded(false);
                }}
                className="py-2 h-fit w-fit px-3 text-sm rounded-full bg-[#e7e7e7] text-[#000000] font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSave();
                }}
                className="py-2 h-fit w-fit px-3 text-sm rounded-full bg-[#ff5a54] text-white font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
