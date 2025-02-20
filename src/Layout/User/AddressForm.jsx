import { use, useState } from "react";
import AddressInput from "../../Components/Inputs/AddressInput";

export default function AddressForm({
  setAddress,
  address,
  handleSaveAddress,
  setIsEditAddress
}) {
  const [currAddress, setCurrAddress] = useState(
    address
      ? address
      : {
          postcode: null,
          state: null,
          district: null,
          city: null,
          housename: null,
          roadname: null,
        }
  );

  const [empty, setEmpty] = useState([]);

  const handleSave = () => {
    const newEmptyFields = [];

    for (const key in currAddress) {
      if (!currAddress[key]) {
        newEmptyFields.push(key);
      }
    }

    if (newEmptyFields.length == 0) {
      handleSaveAddress(currAddress);
      setAddress(currAddress);
    } else {
      setEmpty(newEmptyFields);
    }
  };

  return (
    <>
      <div className="w-9/12 h-screen fixed z-50 content-center transition-all md:block hidden">
        <div className="w-3/5 h-fit p-10 pb-20 bg-[#ffffff] mx-auto rounded-xl relative">
        <div className="flex w-full mb-6 gap-2">
          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"Pincode"}
            value={currAddress?.postcode}
            objKey={"postcode"}
          />

          <AddressInput
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
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"District"}
            value={currAddress?.district}
            objKey={"district"}
          />

          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"City"}
            value={currAddress?.city}
            objKey="city"
          />
          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"House Name"}
            value={currAddress?.housename}
            objKey="housename"
          />
          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"Road name, Area, Colony"}
            value={currAddress?.roadname}
            objKey="roadname"
          />
          <AddressInput
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
                setIsEditAddress(false);
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
        </div>
      </div>
      <div className="w-full px-6 pt-14 md:hidden block">
        <div className="flex w-full mb-6 gap-2">
          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"Pincode"}
            value={currAddress?.postcode}
            objKey={"postcode"}
          />

          <AddressInput
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
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"District"}
            value={currAddress?.district}
            objKey={"district"}
          />

          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"City"}
            value={currAddress?.city}
            objKey="city"
          />
          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"House Name"}
            value={currAddress?.housename}
            objKey="housename"
          />
          <AddressInput
            empty={empty}
            setCurrAddress={setCurrAddress}
            currAddress={currAddress}
            label={"Road name, Area, Colony"}
            value={currAddress?.roadname}
            objKey="roadname"
          />
          <AddressInput
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
                setIsEditAddress(false);
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
      </div>
    </>
  );
}
