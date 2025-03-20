import { useNavigate } from "react-router-dom";

export default function SeeMoreButton() {

  const navigate = useNavigate()

  const handleNav = ()=>{
    navigate('/list')
  }

  return (
    <>
      <button onClick={()=>{
        handleNav()
      }} className="py-3 px-5 md:mt-20 mt-8 bg-[#ffffff] border-2 border-[#eeeeee] rounded-full text-[#242323] text-sm md:text-base font-bold">
        See more
      </button>
    </>
  );
}
