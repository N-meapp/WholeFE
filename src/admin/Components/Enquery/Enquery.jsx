import React, { useState } from 'react';
import { useEffect } from 'react';
import { getEnquery } from '../../../api/adminApi';

const Enquery = () => {
    const [enqueryData, setEnqueryData] = useState([])

    useEffect(() => {
        getEnquery(setEnqueryData)
    }, [])


    return (
        <div className='p-7 h-[85vh] overflow-y-auto'>
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
                                className="w-16 h-16 rounded-full mt-3"
                                src={item.product_image[0]}
                                alt="Avatar"
                            />
                                <div>
                                    <p className='mt-5'>{item.product_name}</p>
                                    <p className='text-[11px] text-[#8e8e8e]'>{item.product_description}</p>
                                </div>

                            </div>

                            <p>&nbsp;</p>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p className='text-[#6d6d6d]'> &nbsp; &nbsp; &nbsp;{item.message}</p>
                            </div>

                            <div className='flex mt-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-gray-500">
                                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                                </svg>
                                <p className='text-[#6d6d6d]'> &nbsp;&nbsp;&nbsp;{item.message}</p>
                            </div>
                        </div>
                    </div>
                </div>

            ))}

        </div>
    )
}

export default Enquery