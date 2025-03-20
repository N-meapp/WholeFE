import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyOrder(){

    const navigate = useNavigate()

  return (
    <>
    <div className='w-screen h-screen content-center'>
    <DotLottieReact className='md:w-80 w-44 md:h-80 h-44 mx-auto'
      src="https://lottie.host/8b67999a-e1f3-4728-b4e4-14c89e42f45a/vAZUquByxt.lottie"
      loop
      autoplay
    />
     <div className="w-fit h-fit mx-auto items-center">
      
      <h1 className="text-center font-bold text-[#747373] text-sm">You haven't placed any <br></br>orders yet !</h1>
      <button onClick={()=>{
        navigate('/list')
      }} className='p-3 py-3 bg-white self-center rounded-full text-sm shadow-lg mt-3 font-bold'>Explore products</button>
      </div>
    </div>
    </>
  );
};
