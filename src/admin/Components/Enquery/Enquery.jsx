import React, { useState } from 'react';
import { useEffect } from 'react';
import { getEnquery } from '../../../api/adminApi';

const Enquery = () => {
    const [enqueryData, setEnqueryData] = useState([])

    useEffect(() => {
        getEnquery(setEnqueryData)
    }, [])


    return (
        <div className='p-7'>
            {enqueryData.map((item) => (

                <div class="flex w-full mb-5">
                    <div
                        class="mr-5 flex h-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-full bg-[#4a7fe8] dark:border dark:border-zinc-800">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                            aria-hidden="true" class="h-4 w-4 text-white" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                                clip-rule="evenodd"></path>
                        </svg>
                        </div>
                    <div
                        class="rounded-xl w-full border flex shadow-lg !max-h-max bg-[#fbfbfb] p-5 !px-[22px] !py-[22px] text-base font-normal leading-6 text-black backdrop-blur-xl dark:border-zinc-800 dark:!bg-white/5 dark:text-white md:text-base md:leading-[26px]">
                        <div class="text-base font-normal">
                            <p><strong>{item.username}</strong></p>
                            <div className='flex gap-3 w-full'>  <img
                                className="w-10 h-13 rounded-full mt-3"
                                src="https://img.freepik.com/free-vector/young-prince-vector-illustration_1308-174367.jpg?t=st=1738060653~exp=1738064253~hmac=8742b1467d69cce14637fd4f79982d3e1a27ea01bc51bf58b8ea6f297689571b&w=740"
                                alt="Avatar"
                            />
                                <div>
                                    <p className='mt-5'>{item.product_name}</p>
                                    <p className='text-[11px] text-[#8e8e8e]'>{item.product_description}</p>
                                </div>

                            </div>

                            <p>&nbsp;</p>

                            <p className='text-[#6d6d6d]'>{item.message}</p>
                        </div>
                    </div>
                </div>

            ))}

        </div>
    )
}

export default Enquery