import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart(){

  const navigate = useNavigate()

  return (
    <>
    <div className='w-screen h-screen content-center'>
    <DotLottieReact className='md:w-80 w-44 md:h-80 h-44 mx-auto'
      src="https://lottie.host/d40cf6cc-0067-4d11-bec3-691331f9ddeb/MxGWqSyH3s.lottie"
      loop
      autoplay
    />
     <div className="w-fit h-fit mx-auto">
      
      <h1 className="text-center text-sm font-bold text-[#747373]">Your cart is empty !</h1>
      <button onClick={()=>{
        navigate('/list')
      }} className='p-3 py-3 bg-white self-center rounded-full text-sm shadow-lg mt-3 font-bold'>Explore products</button>

      </div>
    </div>
    </>
  );
};
