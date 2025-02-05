import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/shopping-cart.png";
import profileImage from "../../assets/Images/profile/profile-1.jpg";
import { Slider } from "@material-tailwind/react";
import SideBar from "./SideBar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BottomNavBar from "./BottomNavbar";

export default function Navbar() {
  const [isSideBar, setIsSideBar] = useState(false);

  const navigate = useNavigate();

  const handleNav = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className="w-full h-auto overflow-hidden">
        <div className="w-full h-fit fixed z-50">
          <div className="lg:w-[70%] w-[90%] md:h-20 h-14 mx-auto bg-[#ffffff] md:mt-8 mt-4 rounded-full shadow-xl flex lg:gap-16 gap-5 md:px-12 px-2 ">
            <div className=" h-full content-center">
              <img className="lg:w-24 w-12" src={logo}></img>
            </div>
            <div className="items-center h-full w-full flex gap-2">
              <div className="w-full relative">
                <input
                  type="message"
                  className="md:py-3 py-2 pr-8 border-[1px] border-[#ff5a5442] rounded-full w-full md:px-6 px-3 font-light md:text-base text-sm text-black placeholder:text-[#0000009c]"
                  placeholder="Search for needs..."
                ></input>

                <div className="content-center absolute h-full md:right-1 right-2 top-0 w-fit ">
                  <button className="px-3 py-2 bg-[#f1f1f1] shadow-md text-sm font-bold text-[#000000bd] rounded-full md:mr-1 md:block hidden">
                    Search
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 md:hidden "
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:flex hidden gap-1 items-center cursor-pointer bg-[#ff5a54] rounded-full  px-3">
                <button className="font-bold text-sm rounded-full py-3 h-fit w-fit border-[#ff5a5442]  text-[white]">
                  category
                </button>
                <div className="w-fit h-fit p-1  rounded-full content-center text-center ">
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>

            <div className="md:flex hidden w-fit justify-between items-center gap-5">
              <button
                onClick={() => {
                  handleNav();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
              </button>

              {/* <button className="px-5 font-bold text-base rounded-full py-3 h-fit bg-[#ff5a54] text-white">
              Login
            </button> */}
              <button
                onClick={() => {
                  setIsSideBar(true);
                }}
                className=" font-bold text-base rounded-full h-12 w-12 bg-[#ff5a54] text-white bg-center bg-cover"
                style={{ backgroundImage: `url(${profileImage})` }}
              ></button>
            </div>
          </div>
        </div>

        <SideBar setIsSideBar={setIsSideBar} isSideBar={isSideBar} />
        <div className="md:hidden">
        <BottomNavBar />
        </div>
      </div>
    </>
  );
}
