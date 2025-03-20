import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import HandleEdit from "./HandleEdit";
import { useState } from "react";
import Profile from "./Profile";
import profileImage from "../../assets/Images/profile/profile-1.jpg";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import LogoutModal from "../../Components/Modal/LogoutModal";
import SuccessModal from "../../Components/Modal/SuccessModal";

export default function SideBar({ setIsSideBar, isSideBar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isLogoutConfirm, setIsLogoutConfirm] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  

  const handleNav = (path) => {
    console.log("haiiii");

    setIsSideBar(false);

    navigate(path);
  };

  const handleLogout = () => {
    setIsLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setIsLogout(true);

    setTimeout(() => {
      dispatch({
        type: "SET_USER",
        payload: {
          user: null,
          token: null,
        },
      });
      navigate("/");
    }, 2500);
  };

  return (
    <>
      <div className="md:block hidden">
        <div
          onClick={() => {
            if (!isEditProfile) {
              setIsSideBar(false);
            }
          }}
          className={`w-screen backdrop-blur-sm bg-white/30 transition-all overflow-hidden h-screen fixed z-50 ${
            isSideBar ? "bg-[#0000003d]" : "hidden"
          }`}
        ></div>
        <div
          className={`transition-all duration-700 h-screen w-full md:w-96 bg-[#ffffff] fixed z-50 shadow-xl ${
            isSideBar ? "right-0" : "md:-right-96 -right-[100vh]"
          }`}
        >
          <div
            onClick={() => {
              if (!isEditProfile) {
                setIsSideBar(false);
              }
            }}
            className="w-10 h-10 bg-[#ffffff] border-[1px] cursor-pointer border-[#a09e9e] float-right mr-4 mt-4 rounded-full content-center justify-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <Profile setIsEditProfile={setIsEditProfile} />

          <div className="w-[80%] h-full mx-auto mt-10">
            <div className="h-[1px] w-full bg-[#e7e7e7] rounded-full"></div>
            <button
              onClick={() => {
                setIsEditProfile(false);
                handleNav("/");
              }}
              className="w-full h-20 flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>

              <h1>Home</h1>
            </button>
            <div className="h-[1px] w-full bg-[#e7e7e7] rounded-full"></div>
            <button className="w-full h-20 flex gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>

              <h1>Favorites</h1>
            </button>
            <div className="h-[1px] w-full bg-[#e7e7e7] rounded-full"></div>
            <button onClick={()=>{
              setIsEditProfile(false);
              handleNav("/order-list");
            }} className="w-full h-20 flex gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                  clipRule="evenodd"
                />
              </svg>

              <h1>Orders</h1>
            </button>
            <div className="h-[1px] w-full bg-[#e7e7e7] rounded-full"></div>
            <button
              onClick={() => {
                setIsEditProfile(false);
                handleNav("/cart");
              }}
              className="w-full h-20 flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>

              <h1>Cart</h1>
            </button>
            <div className="h-[1px] w-full bg-[#e7e7e7] rounded-full"></div>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="w-full h-20 flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>

              <h1>Logout</h1>
            </button>
          </div>
        </div>
        {isEditProfile ? (
          <HandleEdit
            setEditProfile={setIsEditProfile}
            editProfile={isEditProfile}
          />
        ) : null}
      </div>

      <div
        onClick={() => {
          setIsSideBar(false);
        }}
        className={`${
          isSideBar ? "block md:hidden" : "hidden"
        } w-full h-screen fixed backdrop-blur-sm bg-white/30 z-[50] transition-all`}
      ></div>

      {/* mobile view profile */}

      <div
        className={`${
          isSideBar ? "bottom-0" : "-bottom-[100%]"
        } block md:hidden w-full h-fit fixed bg-[#ffffff] z-[50] rounded-t-[80px] shadow-[0px_-5px_87px_rgba(0,0,0,0.12)] transition-all duration-500`}
      >
        <div className="h-full pb-24">
          {isEditProfile ? (
            <HandleEdit
              setEditProfile={setIsEditProfile}
              editProfile={isEditProfile}
            />
          ) : (
            <>
              <Profile setIsEditProfile={setIsEditProfile} />
              <div>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="px-3 float-right mb-20 mr-5 py-2 text-xs border-[#ff5a5450] border rounded-full"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <LogoutModal
        setOpenModal={setIsLogoutConfirm}
        openModal={isLogoutConfirm}
        message={"Confirm Logout"}
        subMessage={"Are you sure you want to log out?"}
        confirmLogout={confirmLogout}
      />
      <SuccessModal
        setOpenModal={setIsLogout}
        openModal={isLogout}
        message={"Logged out"}
        subMessage={"You have been logged out successfully"}
      />
    </>
  );
}
