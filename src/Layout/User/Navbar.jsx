import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/shopping-cart.png";

export default function Navbar() {


  const navigate = useNavigate()

  const handleNav = ()=>{
    navigate('/cart')
  }

  return (
    <>
      <div className="w-full h-fit fixed z-50">
        <div className="w-[70%] h-20 mx-auto bg-[#ffffff] mt-8 rounded-full shadow-xl flex gap-16 px-12 ">
          <div className=" h-full content-center">
            <img className="w-24  " src={logo}></img>
          </div>
          <div className="h-full w-full content-center relative">
            <input
              className="py-3 border-[1px] border-[#ff5a5442] rounded-full w-full px-6 font-light text-md text-black placeholder:text-[#0000009c]"
              placeholder="Search for needs..."
            ></input>
            <div className="content-center absolute h-full right-1 top-0 w-fit">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
  <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
</svg> */}
<button className="px-3 py-2 bg-[#f1f1f1] shadow-md text-sm font-bold text-[#000000bd] rounded-full mr-1">Search</button>
            </div>


          </div>

          <div className="w-fit flex justify-between items-center gap-3">
            <button onClick={()=>{
              handleNav()
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </button>
            <button className="px-5 font-bold text-base rounded-full py-3 h-fit w-max border-[#ff5a5442] border-[1px] text-black">
              Become a seller?
            </button>
            <button className="px-5 font-bold text-base rounded-full py-3 h-fit bg-[#ff5a54] text-white">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
