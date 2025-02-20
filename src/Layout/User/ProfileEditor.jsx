import {
  faLocationCrosshairs,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImage from "../../assets/Images/profile/default.png";
import { useRef, useState } from "react";
import { updateUser } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileEditor({
  setEditProfile,
  user,
  setIsEditAddress,
}) {
  console.log(user, "sdfsf");

  const fileInputRef = useRef(null);

  const [username, setUsername] = useState(user?.username);
  const [phone, setPhone] = useState(user?.phone_number);

  const [profilePicture, setProfilePicture] = useState(defaultImage);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();

      // Event when file is read
      reader.onload = () => {
        const imageUrl = reader.result; // The Base64 data URL
        console.log("imagee ....", imageUrl); // You can use imageUrl as a src for an <img> tag
        setProfilePicture(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    console.log("haiiiii");

    setProfilePicture(defaultImage);
  };

  const handleAddress = (state) => {
    setIsEditAddress(state);
  };

  const handleSave = () => {
    // updateUser({username:username,phone:phone})
    toast.success("Address saved successfully!", {
      onClose: () => {
        setEditProfile(false);
      },
    });
  };

  return (
    <>
      <div className="w-9/12 h-screen fixed z-50 content-center transition-all md:block hidden">
        <div className="w-3/5 h-fit p-10 pb-20 bg-[#ffffff] mx-auto rounded-xl relative">
          <div className="w-full h-full flex flex-col gap-4">
            <div className="h-fit w-full flex gap-4 ">
              <div className="w-fit h-fit">
                <svg
                  onClick={() => {
                    setEditProfile(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 absolute top-3 right-3 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="w-fit bg-[#ffffff] justify-items-center">
                  <div className="w-32 h-32 rounded-full mb-3">
                    <img
                      src={profilePicture}
                      className="w-full h-full rounded-full object-cover object-center"
                    ></img>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        handleButtonClick();
                      }}
                      className="py-2 h-fit w-fit px-2 text-xs font-bold rounded-full border-[#ff5a5442] border-[2px] text-black"
                    >
                      Change
                    </button>
                    <input
                      onChange={(e) => {
                        handleFileChange(e.target.files[0]);
                      }}
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                    ></input>
                    <button
                      onClick={() => {
                        handleRemoveProfilePicture();
                      }}
                      className="py-2 h-fit w-fit px-2 text-xs font-bold rounded-full border-[#ff5a5442] border-[2px] text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-evenly">
                <input
                  className="w-full h-10 rounded-lg px-3 border border-[#b3adad60]"
                  placeholder="Name..."
                ></input>
                <input
                  className="w-full h-10 rounded-lg px-3 border border-[#b3adad60]"
                  placeholder="Contact No..."
                ></input>
              </div>
            </div>
            <div className="w-full h-full">
              <button
                onClick={() => {
                  handleAddress("manual");
                }}
                className="h-10 w-full border-[#b6b4b450] border-[1px] rounded-lg justify-center gap-2 items-center mx-auto mb-5 flex"
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <h1>Edit location manually</h1>
              </button>
              <button
                onClick={() => {
                  handleAddress("current");
                }}
                className="h-10 w-full bg-[#1384c5] rounded-lg justify-center gap-2 items-center text-white mx-auto mb-5 flex"
              >
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <h1>Use current location</h1>
              </button>
            </div>
            <button className="py-3 h-fit w-fit px-5 rounded-full bg-[#ff5a54] text-white font-bold absolute bottom-3 right-3">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-auto md:hidden block transition-all">
        <div className="w-full h-fit px-6 pt-5 relative">
          <div className="w-full h-full flex flex-col gap-5">
            <div className="h-fit w-full flex flex-col items-center gap-4 ">
              <div className="w-fit bg-[#ffffff] justify-items-center transition-all">
                <div className="w-28 h-28 rounded-full mb-3">
                  <img
                    src={profilePicture}
                    className="w-full h-full rounded-full object-cover object-center"
                  ></img>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      handleButtonClick();
                    }}
                    className="py-2 h-fit w-fit px-2 text-xs font-bold rounded-full border-[#ff5a5442] border-[2px] text-black"
                  >
                    Change
                  </button>
                  <input
                    onChange={(e) => {
                      handleFileChange(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                  ></input>
                  <button
                    onClick={() => {
                      handleRemoveProfilePicture();
                    }}
                    className="py-2 h-fit w-fit px-2 text-xs font-bold rounded-full border-[#ff5a5442] border-[2px] text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="flex gap-4">
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                    className="w-full h-10 rounded-lg px-3 border text-sm border-[#b3adad60] placeholder:text-sm"
                    placeholder="Name..."
                  ></input>
                  <input
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                    className="w-full h-10 rounded-lg px-3 border text-sm border-[#b3adad60] placeholder:text-sm"
                    placeholder="Contact No..."
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <button
                onClick={() => {
                  handleAddress("manual");
                }}
                className="h-10 w-full border-[#b6b4b450] border-[1px] rounded-lg justify-center gap-2 items-center mx-auto mb-5 flex"
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <h1>Edit location manually</h1>
              </button>
              <button
                onClick={() => {
                  handleAddress("current");
                }}
                className="h-10 w-full bg-[#1384c5] rounded-lg justify-center gap-2 items-center text-white mx-auto mb-5 flex"
              >
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <h1>Use current location</h1>
              </button>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setEditProfile(false);
                }}
                className="py-2 h-fit w-fit px-3 text-sm rounded-full bg-[#e7e7e7] text-[#000000] font-bold"
              >
                Back
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
      <ToastContainer autoClose={2000} toastClassName="toast-blur" />
    </>
  );
}
