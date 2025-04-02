// import iconA from "../../assets/Images/wholeIcons/image.png";
// import iconB from "../../assets/Images/wholeIcons/sales.png";
// import iconC from "../../assets/Images/wholeIcons/wholesale.png";
// import iconD from "../../assets/Images/wholeIcons/wholesaler (1).png";
// import iconE from "../../assets/Images/wholeIcons/wholesaler (2).png";

import iconB from "../../assets/Images/wholeIcons/sign.png";
import iconA from "../../assets/Images/wholeIcons/truckkk.png";
import iconC from "../../assets/Images/wholeIcons/best-price.png";
import iconD from "../../assets/Images/wholeIcons/delivery-truck.png";
import iconE from "../../assets/Images/wholeIcons/wholesale (1).png";

import backgroundImage from "../../assets/Images/wholeIcons/bg-3.png";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const [scrollTop, setScrollTop] = useState(0);

  const [prevScrollTop, setPrevScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // Detect if scrolling just started from 0px
      if (prevScrollTop === 0 && currentScroll > 0) {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }else if(prevScrollTop>=window.innerHeight && currentScroll < window.innerHeight){

        window.scrollTo({ top: -window.innerHeight, behavior: "smooth" });
        

      }

      setPrevScrollTop(currentScroll); // Update previous scroll position
      setScrollTop(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollTop]); // Runs when `prevScrollTop` changes

  return (
    <>
      <div onScroll={()=>{
        setIsScrolled(true)
      }} className="w-full h-[80vh] md:h-[76vh] flex content-center md:rounded-b-[150px] rounded-b-[60px]">
        {/* <div className="w-full bg-[#0000003b] h-7 items-center justify-between flex absolute">
          <h1 className="text-xs text-[#f0eeee] ml-5">
            Kottayam | Eranakulam | Thrissur | Trivandrum
          </h1>
          <h1 className="text-xs text-[#f0eeee] mr-5">Contact</h1>
        </div> */}
    
          
        <div
          className="h-[80vh] md:h-[76vh] w-full md:rounded-b-[150px] rounded-b-[60px] "
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-full h-[80vh] md:h-[76vh] md:flex absolute bg-gradient-to-t md:bg-gradient-to-b to-[black] md:rounded-b-[150px] rounded-b-[60px] from-[#00000000] items-center">
          <div className="md:w-1/2 md:h-1/2 mt-24 justify-items-center">
          <div className="md:w-3/4 h-auto">
                <h1 className="md:text-7xl md:text-start text-center text-4xl text-[#f3f3f3] font-bold">Whole<span className="text-[#ff5a54]">sale</span> Made Simple!</h1>
                <h1 className="md:text-xl text-md text-[#adadad] mt-8 md:text-start text-center mx-5">Delivering Quality in Bulk, Savings in Every Order!</h1>

          </div>
          </div>
          <div className="md:w-1/2 w-full md:h-1/2 mt-14 md:mt-0 justify-items-center">
            <div className="w-2/3 h-auto flex gap-3 justify-center">
              <div className="md:w-[30%] w-fit justify-items-end h-full self-center">
                <div className="w-fit h-fit rounded-lg bg-white/30 backdrop-blur-sm md:p-5 p-2 hover:bg-[#00000042] transition-all">
                  <img className="object-contain w-14 md:w-20" src={iconD}></img>
                </div>
                <div className="w-fit h-fit rounded-lg bg-white/30 backdrop-blur-sm md:p-5 p-2 hover:bg-[#00000042] transition-all float-right mt-3">
                  <img className="object-contain w-4 md:w-10" src={iconE}></img>
                </div>
              </div>
              <div className="md:w-[70%] w-fit h-full">
                <div className="w-full h-1/2 items-end flex mb-3 gap-3">
                  <div className="w-fit h-fit rounded-lg bg-white/30 backdrop-blur-sm md:p-5 p-2 hover:bg-[#00000042] transition-all">
                    <img className="object-contain w-14 md:w-20" src={iconC}></img>
                  </div>
                  <div className="w-fit h-fit rounded-lg bg-white/30 backdrop-blur-sm md:p-5 p-2 hover:bg-[#00000042] transition-all">
                    <img className="object-contain w-4 md:w-10" src={iconA}></img>
                  </div>
                </div>
                <div className="w-full h-1/2">
                  <div className="w-fit h-fit rounded-lg bg-white/30 backdrop-blur-sm md:p-5 p-2 hover:bg-[#00000042] transition-all">
                    <img className="object-contain w-20 md:w-28" src={iconB}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
