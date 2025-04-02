import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/shopping-cart.png";
import { Slider } from "@material-tailwind/react";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import BottomNavBar from "./BottomNavbar";
import { fetchCategoryList, getSearchedOutput } from "../../api/productApi";
import { HomeContext, SearchContext } from "../../main";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { searchKey, setSearchKey } = useContext(SearchContext);
  const [isCategoryShow, setIsCategoryShow] = useState(false);
  const [category, setCategory] = useState([]);
  const { isHomePage, setIsHomePage } = useContext(HomeContext);

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleNav = () => {
    navigate("/cart");
  };

  const handleSearch = (value) => {
    const isAtTop =
      window.scrollY === 0 || document.documentElement.scrollTop === 0;

    // Detect if scrolling just started from 0px
    console.log(isAtTop, "issatt topp");

    if (isAtTop) {
      console.log("shiiii");

      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
    setSearchKey(value);
    if (value) {
      navigate("/list");
    } else {
      navigate("/");
    }
  };

  const handleCategory = () => {
    fetchCategoryList(setCategory);
    if (isCategoryShow) {
      setIsCategoryShow(false);
    } else {
      setIsCategoryShow(true);
    }
  };

  const handleEachCategory = (cat) => {
    setIsCategoryShow(false);
    navigate("/category-list", { state: { category: cat } });
  };

  return (
    <>
      <div
        className={`w-full h-auto z-50 ${
          isHomePage ? "sticky top-0 " : "fixed top-3"
        }`}
      >
        <div className={`w-full h-auto overflow-hidden -mt-[10px] ${isHomePage?'md:-mt-[66px]':''}`}>
          <div className="w-full mb-44">
            <div className="lg:w-[70%] w-[90%] md:h-20 h-14 mx-auto bg-[#ffffff] md:mt-8 mt-4 rounded-full shadow-xl flex lg:gap-16 gap-5 md:px-12 px-2">
              <div className=" h-full content-center">
                <img className="lg:w-24 w-12" src={logo}></img>
              </div>
              <div className="items-center h-full w-full flex gap-2">
                <div className="w-full relative">
                  <input
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    type="message"
                    className="md:py-3 py-2 pr-8 border-[1px] border-[#ff5a5442] rounded-full w-full md:px-6 px-3 font-light md:text-base text-sm text-black placeholder:text-[#0000009c]"
                    placeholder="Search your needs..."
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
                <div>
                  <div
                    onClickCapture={() => {
                      handleCategory();
                    }}
                    className="md:flex hidden gap-1 items-center cursor-pointer bg-[#ff5a54] rounded-full relative px-3"
                  >
                    <button className="font-bold text-sm rounded-full py-3 h-fit w-fit border-[#ff5a5442]  text-[white]">
                      category
                    </button>
                    <div className="w-fit h-fit p-1  rounded-full content-center text-center ">
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className={`${
                          isCategoryShow ? "rotate-180" : "rotate-0"
                        } transition-all duration-300`}
                      />
                    </div>
                  </div>
                  <div
                    className={` ${
                      isCategoryShow ? "block" : "hidden"
                    }  shadow-lg absolute mt-1 bg-white/75 backdrop-blur-md rounded-2xl p-4 text-center flex flex-col`}
                  >
                    {category?.map((cat) => {
                      return (
                        <>
                          <button
                            onClick={() => {
                              handleEachCategory(cat.category_name);
                            }}
                            className="py-3 text-sm border-b"
                          >
                            {cat.category_name}
                          </button>
                        </>
                      );
                    })}
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
                  className=" font-bold text-base rounded-full h-12 w-12 text-white bg-center bg-cover"
                  style={{ backgroundImage: `url(${user.profile})` }}
                ></button>
              </div>
            </div>
          </div>

          <SideBar setIsSideBar={setIsSideBar} isSideBar={isSideBar} />
          <div className="md:hidden">
            <BottomNavBar category={category} />
          </div>
        </div>
      </div>

      {/* <div className="w-full h-full absolute bg-[#ffffff]">
      </div> */}
    </>
  );
}
