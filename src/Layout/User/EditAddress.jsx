import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { updateAddress } from "../../api/userApi";

export default function AddressEditor({
  setEditProfile,
  user,
  isEditAddress,
  setIsEditAddress,
}) {

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(user?.address);

  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log('ahahahhhhaa');
    //     const API_KEY = "db42adb37e4e263d2152d1cf261b024e"
    //     const latitude = position.coords.latitude
    //     const longitude = position.coords.longitude
    //     const url = `https://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${latitude},${longitude}`
    //       axios.get(url).then((result)=>{
    //             console.log(result,'resuuuullttt');
    //       })
    //     },
    //     (err) => {
    //       setError("Failed to get location: " + err.message);
    //     }
    //   );
    // } else {
    //   setError("Geolocation is not supported by this browser.");
    // }
  }, []);

  const handleSaveAddress = (data) => {
    updateAddress(data, user.id);

    toast.success("Address saved successfully!", {
      onClose: () => {
        setIsEditAddress(null);
      },
    });
  };

  return (
    <>
      {isEditAddress == "current" ? (
        <>
          {!address ? (
            <div className=" w-full">
              <DotLottieReact
                src="https://lottie.host/7a9011f0-08ab-44a3-a01a-c912e2b93c0e/skmK9byDle.lottie"
                loop
                autoplay
              />
            </div>
          ) : (
            <>
              <AddressForm
                etAddress={setAddress}
                address={address}
                handleSaveAddress={handleSaveAddress}
                setIsEditAddress={setIsEditAddress}
              />
            </>
          )}
        </>
      ) : (
        <>
          <AddressForm
            setAddress={setAddress}
            address={address}
            handleSaveAddress={handleSaveAddress}
            setIsEditAddress={setIsEditAddress}
          />
        </>
      )}
      <ToastContainer autoClose={2000} toastClassName="toast-blur" />
    </>
  );
}
