import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImage from "../../assets/Images/profile/default.png"
import { useRef, useState } from "react";

export default function ProfileEditor({editProfile,setEditProfile}) {


  const fileInputRef = useRef(null)

  const [profilePicture,setProfilePicture] = useState(defaultImage)


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (file)=>{
    if (file) {
      const reader = new FileReader();
  
      // Event when file is read
      reader.onload = () => {
        const imageUrl = reader.result; // The Base64 data URL
        console.log('imagee ....',imageUrl); // You can use imageUrl as a src for an <img> tag
        setProfilePicture(imageUrl)
      };
  
      reader.readAsDataURL(file);
      
    }
      
  }

  const handleRemoveProfilePicture = () =>{
    setProfilePicture(defaultImage)
  }

  return (
    <>
      <div className="w-9/12 h-screen fixed z-50 content-center transition-all">
        <div className="w-3/5 h-2/5  bg-[#ffffff] mx-auto rounded-xl content-center relative">
          <svg
          onClick={()=>{
            setEditProfile(false)
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

          <div className="w-fit gap-8 flex mx-auto">
            <div className="w-40 h-40 rounded-full">
            <img src={profilePicture} className="w-full h-full rounded-full object-cover object-center"></img>
            </div>
            <div className="flex flex-col gap-8 justify-center">
              <button onClick={()=>{
                handleButtonClick()
              }} className="py-3 h-fit w-fit px-5 font-bold rounded-full border-[#ff5a5442] border-[2px] text-black">
                Change
              </button>
              <input onChange={(e)=>{
                handleFileChange(e.target.files[0])
              }} type="file" accept="image/*" ref={fileInputRef} className="hidden"></input>
              <button onClick={()=>{
                handleRemoveProfilePicture()
              }} className="py-3 h-fit w-fit px-5 font-bold rounded-full border-[#ff5a5442] border-[2px] text-black">
                Remove
              </button>
            </div>
          </div>
          <button className="py-3 h-fit w-fit px-5 rounded-full bg-[#ff5a54] text-white font-bold absolute bottom-3 right-3">
                Save
              </button>
        </div>
      </div>
    </>
  );
}
