import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function EmptyCart(){
  return (
    <>
    <div className='w-screen h-screen content-center'>
    <DotLottieReact className='md:w-80 w-44 md:h-80 h-44 mx-auto'
      src="https://lottie.host/d40cf6cc-0067-4d11-bec3-691331f9ddeb/MxGWqSyH3s.lottie"
      loop
      autoplay
    />
     <div className="w-fit h-fit mx-auto">
      
      <h1 className="text-center text-base font-bold text-[#747373]">Your cart is empty !</h1>
      </div>
    </div>
    </>
  );
};
